import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const STORAGE_PREFIX = "fantasi-coffee:";
const STORAGE_TIMEOUT_MS = 1500;

function withTimeout<T>(promise: Promise<T>, fallback: T) {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => {
      setTimeout(() => resolve(fallback), STORAGE_TIMEOUT_MS);
    }),
  ]);
}

async function getItem(key: string) {
  const storageKey = `${STORAGE_PREFIX}${key}`;

  if (Platform.OS === "web") {
    return typeof window === "undefined" ? null : window.localStorage.getItem(storageKey);
  }

  return SecureStore.getItemAsync(storageKey);
}

async function setItem(key: string, value: string) {
  const storageKey = `${STORAGE_PREFIX}${key}`;

  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, value);
    }
    return;
  }

  await SecureStore.setItemAsync(storageKey, value);
}

async function deleteItem(key: string) {
  const storageKey = `${STORAGE_PREFIX}${key}`;

  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKey);
    }
    return;
  }

  await SecureStore.deleteItemAsync(storageKey);
}

export async function readJson<T>(key: string): Promise<T | null> {
  try {
    const value = await withTimeout(getItem(key), null);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

export async function writeJson(key: string, value: unknown) {
  try {
    await withTimeout(setItem(key, JSON.stringify(value)), undefined);
  } catch {
    // Storage is optional for the first render; the in-memory session can still work.
  }
}

export const sessionStorage = {
  read: () => readJson<{ userId: string }>("session"),
  write: (value: { userId: string }) => writeJson("session", value),
  clear: async () => {
    try {
      await deleteItem("session");
    } catch {
      // Ignore storage cleanup errors during logout.
    }
  },
};

export const usersStorage = {
  read: () => readJson<import("./types").AppUser[]>("users"),
  write: (value: import("./types").AppUser[]) => writeJson("users", value),
};
