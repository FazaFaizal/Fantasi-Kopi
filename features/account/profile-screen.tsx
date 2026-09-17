import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { AppCard } from "@/components/ui/app-card";
import { RoleBadge } from "@/components/ui/role-badge";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/auth-context";
import { roleDescription } from "@/features/auth/types";

export function ProfileScreen() {
  const { user, logout } = useAuth();

  async function signOut() {
    await logout();
    router.replace("/login");
  }

  function confirmLogout() {
    Alert.alert("Keluar dari akun?", "Sesi kamu akan diakhiri di perangkat ini.", [
      { text: "Batal", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut },
    ]);
  }

  return (
    <View className="flex-1 bg-background px-5 pb-8 pt-14">
      <Text className="text-3xl font-bold text-text">Profil</Text>
      <Text className="mt-2 text-sm text-gray-500">Kelola identitas dan sesi akun kamu.</Text>

      <AppCard className="mt-6">
        <View className="flex-row items-center">
          <View className="h-16 w-16 items-center justify-center rounded-3xl bg-red-50">
            <Text className="text-xl font-bold text-primary">
              {user?.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </Text>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-text">{user?.name}</Text>
            <Text className="mt-1 text-sm text-gray-500">{user?.email}</Text>
            <View className="mt-2 flex-row items-center">
              {user ? <RoleBadge role={user.role} /> : null}
            </View>
          </View>
        </View>
        <View className="mt-5 flex-row items-center border-t border-gray-100 pt-4">
          <Ionicons name="shield-checkmark-outline" size={18} color="#059669" />
          <Text className="ml-2 flex-1 text-sm text-gray-600">
            {user ? roleDescription(user.role) : "Akses terverifikasi"}
          </Text>
        </View>
      </AppCard>

      <TouchableOpacity
        onPress={confirmLogout}
        activeOpacity={0.85}
        className="mt-5 flex-row items-center justify-center rounded-button border border-red-200 bg-white py-4"
      >
        <Ionicons name="log-out-outline" size={20} color={Colors.primary} />
        <Text className="ml-2 font-bold text-primary">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
