import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/colors";
import { AppInput } from "@/components/ui/app-input";
import { AppUser, Role, UserInput, UserStatus, roleDescription, roleLabel } from "@/features/auth/types";

type Props = {
  visible: boolean;
  user?: AppUser | null;
  onClose: () => void;
  onSubmit: (input: UserInput) => Promise<{ success: true } | { success: false; error: string }>;
};

const roles: Role[] = ["admin", "kasir", "pengguna"];

export function UserFormModal({ visible, user, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("kasir");
  const [status, setStatus] = useState<UserStatus>("active");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPassword("");
    setRole(user?.role ?? "kasir");
    setStatus(user?.status ?? "active");
    setError("");
    setIsSaving(false);
  }, [user, visible]);

  async function submit() {
    if (name.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }

    if (!email.trim().includes("@")) {
      setError("Masukkan email yang valid.");
      return;
    }

    if (!user && password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setIsSaving(true);
    const result = await onSubmit({
      name,
      email,
      password: password || undefined,
      role,
      status,
    });
    setIsSaving(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/30">
        <Pressable className="flex-1" onPress={onClose} />
        <View className="max-h-[88%] rounded-t-[28px] bg-background px-5 pb-8 pt-4">
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-text">
                {user ? "Edit akun" : "Tambah akun"}
              </Text>
              <Text className="mt-1 text-sm text-gray-500">
                Atur akses dan status akun di sini.
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Tutup"
              className="h-10 w-10 items-center justify-center rounded-full bg-white"
            >
              <Ionicons name="close" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              label="Nama lengkap"
              value={name}
              onChangeText={setName}
              placeholder="Contoh: Andi Saputra"
              autoCapitalize="words"
              leading={<Ionicons name="person-outline" size={19} color={Colors.muted} />}
            />
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="nama@fantasi.coffee"
              keyboardType="email-address"
              leading={<Ionicons name="mail-outline" size={19} color={Colors.muted} />}
            />
            <AppInput
              label={user ? "Password baru (opsional)" : "Password"}
              value={password}
              onChangeText={setPassword}
              placeholder={user ? "Biarkan kosong jika tidak berubah" : "Minimal 6 karakter"}
              secureTextEntry
              leading={<Ionicons name="lock-closed-outline" size={19} color={Colors.muted} />}
            />

            <Text className="mb-2 text-sm font-semibold text-text">Role</Text>
            <View className="mb-5 gap-2">
              {roles.map((candidate) => (
                <TouchableOpacity
                  key={candidate}
                  onPress={() => setRole(candidate)}
                  activeOpacity={0.85}
                  className={`flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
                    role === candidate
                      ? "border-primary bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <View className="flex-1 pr-3">
                    <Text className="font-bold text-text">{roleLabel(candidate)}</Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      {roleDescription(candidate)}
                    </Text>
                  </View>
                  <Ionicons
                    name={role === candidate ? "radio-button-on" : "radio-button-off"}
                    size={21}
                    color={role === candidate ? Colors.primary : Colors.muted}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View className="mb-5 flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4">
              <View>
                <Text className="font-bold text-text">Akun aktif</Text>
                <Text className="mt-1 text-xs text-gray-500">
                  User aktif dapat masuk ke aplikasi.
                </Text>
              </View>
              <Switch
                value={status === "active"}
                onValueChange={(value) => setStatus(value ? "active" : "inactive")}
                trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
                thumbColor={status === "active" ? Colors.primary : "#F9FAFB"}
              />
            </View>

            {error ? (
              <View className="mb-4 flex-row rounded-2xl bg-red-50 px-4 py-3">
                <Ionicons name="alert-circle" size={19} color={Colors.primary} />
                <Text className="ml-2 flex-1 text-sm leading-5 text-primary">{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={submit}
              disabled={isSaving}
              activeOpacity={0.85}
              className={`items-center rounded-button py-4 ${
                isSaving ? "bg-red-300" : "bg-primary"
              }`}
            >
              <Text className="font-bold text-white">
                {isSaving ? "Menyimpan..." : user ? "Simpan perubahan" : "Tambah akun"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
