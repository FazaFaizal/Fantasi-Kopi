import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppInput } from "@/components/ui/app-input";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/auth-context";
import { DEMO_ACCOUNTS } from "@/features/auth/mock-data";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit() {
    setError("");
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (result.user?.role === "admin") {
      router.replace("/dashboard");
    } else if (result.user?.role === "kasir") {
      router.replace("/pos");
    } else {
      router.replace("/menu");
    }
  }

  function fillAccount(account: (typeof DEMO_ACCOUNTS)[number]) {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-10 pt-20"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-10">
          <View className="mb-6 h-16 w-16 items-center justify-center rounded-3xl bg-primary shadow-sm">
            <Ionicons name="cafe" size={32} color={Colors.surface} />
          </View>
          <Text className="text-4xl font-bold text-text">Selamat datang.</Text>
          <Text className="mt-3 max-w-[320px] text-base leading-6 text-gray-500">
            Masuk ke ruang kerja Fantasi Coffee untuk melanjutkan aktivitas.
          </Text>
        </View>

        <View className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
          <Text className="mb-5 text-xl font-bold text-text">Masuk ke akun</Text>
          <AppInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="nama@fantasi.coffee"
            keyboardType="email-address"
            autoComplete="email"
            leading={<Ionicons name="mail-outline" size={19} color={Colors.muted} />}
          />
          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password"
            secureTextEntry={!showPassword}
            autoComplete="password"
            leading={<Ionicons name="lock-closed-outline" size={19} color={Colors.muted} />}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((current) => !current)}
            activeOpacity={0.8}
            className="mb-5 flex-row items-center self-end"
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={Colors.muted}
            />
            <Text className="ml-2 text-sm font-semibold text-gray-500">
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </Text>
          </TouchableOpacity>

          {error ? (
            <View className="mb-5 flex-row rounded-2xl bg-red-50 px-4 py-3">
              <Ionicons name="alert-circle" size={19} color={Colors.primary} />
              <Text className="ml-2 flex-1 text-sm leading-5 text-primary">{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={submit}
            disabled={isSubmitting}
            activeOpacity={0.85}
            className={`items-center rounded-button py-4 ${
              isSubmitting ? "bg-red-300" : "bg-primary"
            }`}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.surface} />
            ) : (
              <Text className="font-bold text-white">Masuk</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-sm font-bold text-text">Akun demo</Text>
            <Text className="text-xs text-gray-500">Pilih untuk mengisi otomatis</Text>
          </View>
          <View className="gap-2">
            {DEMO_ACCOUNTS.map((account) => (
              <TouchableOpacity
                key={account.email}
                onPress={() => fillAccount(account)}
                activeOpacity={0.8}
                className="flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3"
              >
                <View>
                  <Text className="font-bold text-text">{account.role}</Text>
                  <Text className="mt-1 text-xs text-gray-500">{account.email}</Text>
                </View>
                <Ionicons name="arrow-forward-circle-outline" size={23} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="mt-4 text-center text-xs leading-5 text-gray-400">
            Iterasi 1 menggunakan data lokal untuk mendemonstrasikan auth dan manajemen akun.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
