import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function CustomerOrdersScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="h-16 w-16 items-center justify-center rounded-3xl bg-white">
        <Ionicons name="receipt-outline" size={30} color={Colors.muted} />
      </View>
      <Text className="mt-5 text-xl font-bold text-text">Belum ada pesanan</Text>
      <Text className="mt-2 text-center text-sm leading-5 text-gray-500">
        Riwayat pesanan customer akan tersedia saat alur ordering dibangun.
      </Text>
    </View>
  );
}
