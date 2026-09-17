import { INITIAL_USERS } from "./mock-data";
import { sessionStorage, usersStorage } from "./storage";
import { AppUser, Role, UserInput } from "./types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AuthResult =
  | { success: true; user?: AppUser }
  | { success: false; error: string };

type AuthContextValue = {
  user: AppUser | null;
  users: AppUser[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  addUser: (input: UserInput) => Promise<AuthResult>;
  updateUser: (id: string, input: UserInput) => Promise<AuthResult>;
  toggleUserStatus: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<AuthResult>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function now() {
  return new Date().toISOString();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function withoutPassword(user: AppUser): AppUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function restore() {
      try {
        const [storedUsers, session] = await Promise.all([
          usersStorage.read(),
          sessionStorage.read(),
        ]);
        const nextUsers = storedUsers?.length ? storedUsers : INITIAL_USERS;
        const restoredUser = session
          ? nextUsers.find((candidate) => candidate.id === session.userId)
          : null;

        if (mounted) {
          setUsers(nextUsers);
          setUser(
            restoredUser?.status === "active" ? withoutPassword(restoredUser) : null,
          );
        }

        // Do not block the first render on SecureStore.
        if (!storedUsers?.length) {
          void usersStorage.write(INITIAL_USERS);
        }
      } catch {
        if (mounted) {
          setUsers(INITIAL_USERS);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    restore();

    return () => {
      mounted = false;
    };
  }, []);

  const persistUsers = useCallback(async (nextUsers: AppUser[]) => {
    setUsers(nextUsers);
    await usersStorage.write(nextUsers);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const normalizedEmail = normalizeEmail(email);

      if (!normalizedEmail || !normalizedEmail.includes("@")) {
        return { success: false, error: "Masukkan email yang valid." };
      }

      if (!password) {
        return { success: false, error: "Password wajib diisi." };
      }

      const candidate = users.find(
        (item) => item.email.toLowerCase() === normalizedEmail,
      );

      if (!candidate || candidate.password !== password) {
        return { success: false, error: "Email atau password tidak sesuai." };
      }

      if (candidate.status !== "active") {
        return { success: false, error: "Akun ini sedang dinonaktifkan." };
      }

      await sessionStorage.write({ userId: candidate.id });
      const safeUser = withoutPassword(candidate);
      setUser(safeUser);
      return { success: true, user: safeUser };
    },
    [users],
  );

  const logout = useCallback(async () => {
    await sessionStorage.clear();
    setUser(null);
  }, []);

  const addUser = useCallback(
    async (input: UserInput): Promise<AuthResult> => {
      const email = normalizeEmail(input.email);

      if (users.some((candidate) => candidate.email.toLowerCase() === email)) {
        return { success: false, error: "Email sudah digunakan." };
      }

      if (!input.password || input.password.length < 6) {
        return { success: false, error: "Password minimal 6 karakter." };
      }

      const timestamp = now();
      const newUser: AppUser = {
        id: `usr-${Date.now()}`,
        name: input.name.trim(),
        email,
        role: input.role,
        status: input.status,
        password: input.password,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await persistUsers([...users, newUser]);
      return { success: true };
    },
    [persistUsers, users],
  );

  const updateUser = useCallback(
    async (id: string, input: UserInput): Promise<AuthResult> => {
      const email = normalizeEmail(input.email);
      const emailTaken = users.some(
        (candidate) =>
          candidate.id !== id && candidate.email.toLowerCase() === email,
      );

      if (emailTaken) {
        return { success: false, error: "Email sudah digunakan." };
      }

      const existing = users.find((candidate) => candidate.id === id);
      if (!existing) {
        return { success: false, error: "Data user tidak ditemukan." };
      }

      const updatedUser: AppUser = {
        ...existing,
        name: input.name.trim(),
        email,
        role: input.role,
        status: input.status,
        password: input.password || existing.password,
        updatedAt: now(),
      };

      await persistUsers(
        users.map((candidate) => (candidate.id === id ? updatedUser : candidate)),
      );

      if (user?.id === id) {
        if (updatedUser.status === "active") {
          setUser(withoutPassword(updatedUser));
        } else {
          await logout();
        }
      }

      return { success: true };
    },
    [logout, persistUsers, user?.id, users],
  );

  const toggleUserStatus = useCallback(
    async (id: string) => {
      const target = users.find((candidate) => candidate.id === id);
      if (!target) {
        return;
      }

      await updateUser(id, {
        name: target.name,
        email: target.email,
        role: target.role,
        status: target.status === "active" ? "inactive" : "active",
      });
    },
    [updateUser, users],
  );

  const deleteUser = useCallback(
    async (id: string): Promise<AuthResult> => {
      if (id === user?.id) {
        return { success: false, error: "Akun yang sedang digunakan tidak dapat dihapus." };
      }

      if (!users.some((candidate) => candidate.id === id)) {
        return { success: false, error: "Data user tidak ditemukan." };
      }

      await persistUsers(users.filter((candidate) => candidate.id !== id));
      return { success: true };
    },
    [persistUsers, user?.id, users],
  );

  const value = useMemo(
    () => ({
      user,
      users,
      isLoading,
      login,
      logout,
      addUser,
      updateUser,
      toggleUserStatus,
      deleteUser,
    }),
    [
      addUser,
      deleteUser,
      isLoading,
      login,
      logout,
      toggleUserStatus,
      updateUser,
      user,
      users,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export function isRole(user: AppUser | null, role: Role) {
  return user?.role === role;
}
