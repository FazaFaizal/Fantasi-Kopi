import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/auth-context";

const stats = [
  { label: "Penjualan hari ini", value: "Rp 2.450.000", icon: "trending-up", tone: "bg-red-50" },
  { label: "Transaksi hari ini", value: "42", icon: "receipt", tone: "bg-amber-50" },
  { label: "Pemasukan", value: "Rp 2.680.000", icon: "arrow-down", tone: "bg-emerald-50" },
  { label: "Pengeluaran", value: "Rp 480.000", icon: "arrow-up", tone: "bg-blue-50" },
] as const;

export default function AdminDashboardScreen() {
  const { user } = useAuth();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 pb-10 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        eyebrow="Admin workspace"
        title={`Halo, ${user?.name.split(" ")[0] ?? "Admin"}`}
        description="Pantau akses akun dan kondisi operasional Fantasi Coffee."
      />

      <View className="mt-6 rounded-card bg-primary p-5">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-sm font-semibold text-white/75">Ringkasan keuangan</Text>
            <Text className="mt-2 text-3xl font-bold text-white">Rp 2.200.000</Text>
            <Text className="mt-2 text-sm text-white/75">Estimasi bersih hari ini</Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
            <Ionicons name="analytics" size={23} color={Colors.surface} />
          </View>
        </View>
        <View className="mt-6 flex-row items-center">
          <Ionicons name="arrow-up" size={17} color="#BBF7D0" />
          <Text className="ml-1 text-sm font-semibold text-green-100">12,8%</Text>
          <Text className="ml-2 text-sm text-white/65">dibanding kemarin</Text>
        </View>
      </View>

      <View className="mt-4 flex-row flex-wrap justify-between gap-y-3">
        {stats.map((stat) => (
          <View key={stat.label} className="w-[48%] rounded-card bg-white p-4 shadow-sm">
            <View className={`h-9 w-9 items-center justify-center rounded-xl ${stat.tone}`}>
              <Ionicons name={stat.icon} size={18} color={Colors.primary} />
            </View>
            <Text className="mt-4 text-xs leading-4 text-gray-500">{stat.label}</Text>
            <Text className="mt-1 text-base font-bold text-text">{stat.value}</Text>
          </View>
        ))}
      </View>

      <View className="mb-3 mt-8 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-text">Kelola akses</Text>
        <Ionicons name="lock-closed-outline" size={19} color={Colors.muted} />
      </View>
      <View className="gap-3">
        <TouchableOpacity
          onPress={() => router.push("/employees")}
          activeOpacity={0.85}
        >
          <AppCard>
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-red-50">
                <Ionicons name="briefcase-outline" size={22} color={Colors.primary} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-text">Manajemen karyawan</Text>
                <Text className="mt-1 text-sm text-gray-500">
                  Admin dan kasir yang menjalankan operasional
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
            </View>
          </AppCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/users")} activeOpacity={0.85}>
          <AppCard>
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                <Ionicons name="people-outline" size={22} color="#2563EB" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-text">Manajemen user & role</Text>
                <Text className="mt-1 text-sm text-gray-500">
                  Atur akun pengguna dan hak akses aplikasi
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
            </View>
          </AppCard>
        </TouchableOpacity>
      </View>

      <Text className="mb-3 mt-8 text-lg font-bold text-text">Aktivitas terbaru</Text>
      <AppCard>
        <View className="flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
            <Ionicons name="person-add-outline" size={19} color="#059669" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-semibold text-text">Akun kasir diperbarui</Text>
            <Text className="mt-1 text-xs text-gray-500">Salsa Anjani • 10 menit lalu</Text>
          </View>
          <Text className="text-xs font-bold text-emerald-700">Selesai</Text>
        </View>
      </AppCard>
    </ScrollView>
  );
}
