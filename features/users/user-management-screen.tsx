import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppCard } from "@/components/ui/app-card";
import { RoleBadge } from "@/components/ui/role-badge";
import { SectionHeader } from "@/components/ui/section-header";
import { UserFormModal } from "@/components/user-form-modal";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/auth-context";
import { AppUser, Role, roleLabel } from "@/features/auth/types";

type Props = {
  mode: "all" | "employees";
};

const allFilters: Array<"Semua" | Role> = ["Semua", "admin", "kasir", "pengguna"];
const employeeFilters: Array<"Semua" | Role> = ["Semua", "admin", "kasir"];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function UserManagementScreen({ mode }: Props) {
  const { users, addUser, updateUser, toggleUserStatus, deleteUser } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Semua" | Role>("Semua");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const filters = mode === "employees" ? employeeFilters : allFilters;

  const visibleUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return users
      .filter((item) => mode === "all" || item.role === "admin" || item.role === "kasir")
      .filter((item) => filter === "Semua" || item.role === filter)
      .filter(
        (item) =>
          !normalizedSearch ||
          item.name.toLowerCase().includes(normalizedSearch) ||
          item.email.toLowerCase().includes(normalizedSearch),
      );
  }, [filter, mode, search, users]);

  const activeCount = visibleUsers.filter((item) => item.status === "active").length;

  function openCreate() {
    setEditingUser(null);
    setModalVisible(true);
  }

  function openEdit(user: AppUser) {
    setEditingUser(user);
    setModalVisible(true);
  }

  function confirmDelete(user: AppUser) {
    Alert.alert(
      "Hapus akun?",
      `${user.name} akan dihapus dari daftar akun. Histori transaksi tetap aman.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            const result = await deleteUser(user.id);
            if (!result.success) {
              Alert.alert("Tidak dapat menghapus", result.error);
            }
          },
        },
      ],
    );
  }

  function confirmToggle(user: AppUser) {
    const nextStatus = user.status === "active" ? "menonaktifkan" : "mengaktifkan";
    Alert.alert(
      `${nextStatus[0].toUpperCase()}${nextStatus.slice(1)} akun?`,
      `${user.name} akan ${nextStatus} dari akses aplikasi.`,
      [
        { text: "Batal", style: "cancel" },
        { text: "Lanjutkan", onPress: () => toggleUserStatus(user.id) },
      ],
    );
  }

  async function refresh() {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsRefreshing(false);
  }

  const title = mode === "employees" ? "Karyawan" : "Manajemen user";
  const description =
    mode === "employees"
      ? "Kelola akun admin dan kasir yang menjalankan operasional."
      : "Atur seluruh akun, role, dan status akses aplikasi.";

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-10 pt-14"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          eyebrow="Akses & akun"
          title={title}
          description={description}
          actionLabel="Tambah akun"
          onAction={openCreate}
        />

        <View className="mt-6 flex-row gap-3">
          <View className="flex-1 rounded-card bg-white p-4 shadow-sm">
            <Text className="text-xs font-semibold text-gray-500">Total ditampilkan</Text>
            <Text className="mt-2 text-2xl font-bold text-text">{visibleUsers.length}</Text>
            <Text className="mt-1 text-xs text-gray-500">akun</Text>
          </View>
          <View className="flex-1 rounded-card bg-red-50 p-4">
            <Text className="text-xs font-semibold text-primary">Akun aktif</Text>
            <Text className="mt-2 text-2xl font-bold text-primary">{activeCount}</Text>
            <Text className="mt-1 text-xs text-red-700">siap digunakan</Text>
          </View>
        </View>

        <View className="mt-5 flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <Ionicons name="search" size={20} color={Colors.muted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Cari nama atau email"
            placeholderTextColor={Colors.muted}
            className="ml-3 flex-1 text-base text-text"
          />
          {search ? (
            <TouchableOpacity
              onPress={() => setSearch("")}
              accessibilityRole="button"
              accessibilityLabel="Hapus pencarian"
            >
              <Ionicons name="close-circle" size={20} color={Colors.muted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerClassName="gap-2 pr-5"
        >
          {filters.map((candidate) => {
            const isActive = filter === candidate;
            return (
              <TouchableOpacity
                key={candidate}
                onPress={() => setFilter(candidate)}
                activeOpacity={0.85}
                className={`rounded-full border px-4 py-2.5 ${
                  isActive ? "border-primary bg-primary" : "border-gray-200 bg-white"
                }`}
              >
                <Text className={`text-sm font-semibold ${isActive ? "text-white" : "text-text"}`}>
                  {candidate === "Semua" ? candidate : roleLabel(candidate)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="mb-3 mt-7 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-text">Daftar akun</Text>
          <Text className="text-sm text-gray-500">{visibleUsers.length} hasil</Text>
        </View>

        <View className="gap-3">
          {visibleUsers.map((item) => (
            <AppCard key={item.id}>
              <View className="flex-row items-start">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                  <Text className="font-bold text-primary">{initials(item.name)}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-2">
                      <Text className="font-bold text-text">{item.name}</Text>
                      <Text className="mt-1 text-sm text-gray-500">{item.email}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => openEdit(item)}
                      accessibilityRole="button"
                      accessibilityLabel={`Edit ${item.name}`}
                      className="h-9 w-9 items-center justify-center rounded-full bg-gray-50"
                    >
                      <Ionicons name="create-outline" size={18} color={Colors.text} />
                    </TouchableOpacity>
                  </View>

                  <View className="mt-3 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <RoleBadge role={item.role} />
                      <View
                        className={`rounded-full px-3 py-1 ${
                          item.status === "active" ? "bg-emerald-50" : "bg-gray-100"
                        }`}
                      >
                        <Text
                          className={`text-xs font-bold ${
                            item.status === "active" ? "text-emerald-700" : "text-gray-500"
                          }`}
                        >
                          {item.status === "active" ? "Aktif" : "Nonaktif"}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <TouchableOpacity
                        onPress={() => confirmToggle(item)}
                        accessibilityRole="button"
                        accessibilityLabel={`Ubah status ${item.name}`}
                      >
                        <Ionicons
                          name={item.status === "active" ? "pause-circle-outline" : "play-circle-outline"}
                          size={22}
                          color={item.status === "active" ? Colors.muted : "#059669"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => confirmDelete(item)}
                        accessibilityRole="button"
                        accessibilityLabel={`Hapus ${item.name}`}
                      >
                        <Ionicons name="trash-outline" size={21} color={Colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </AppCard>
          ))}

          {!visibleUsers.length ? (
            <AppCard>
              <View className="items-center py-8">
                <Ionicons name="people-outline" size={36} color={Colors.muted} />
                <Text className="mt-3 font-semibold text-text">Akun tidak ditemukan</Text>
                <Text className="mt-1 text-center text-sm text-gray-500">
                  Coba ubah kata kunci atau filter yang dipilih.
                </Text>
              </View>
            </AppCard>
          ) : null}
        </View>
      </ScrollView>

      <UserFormModal
        visible={modalVisible}
        user={editingUser}
        onClose={() => setModalVisible(false)}
        onSubmit={(input) =>
          editingUser ? updateUser(editingUser.id, input) : addUser(input)
        }
      />
    </View>
  );
}
