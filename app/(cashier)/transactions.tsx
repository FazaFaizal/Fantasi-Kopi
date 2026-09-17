import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Colors } from "@/constants/colors";

export default function TransactionsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 pb-10 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        eyebrow="Operasional"
        title="Transaksi"
        description="Riwayat transaksi yang diproses oleh kasir."
      />
      <View className="mt-6 gap-3">
        {[
          ["#FC-240901", "Es Kopi Susu • 2 item", "Rp 59.000", "Selesai"],
          ["#FC-240900", "Cappuccino • 1 item", "Rp 35.000", "Selesai"],
          ["#FC-240899", "Chicken Toast • 2 item", "Rp 79.000", "Diproses"],
        ].map(([order, detail, total, status]) => (
          <AppCard key={order}>
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-2xl bg-red-50">
                <Ionicons name="receipt-outline" size={19} color={Colors.primary} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-bold text-text">{order}</Text>
                <Text className="mt-1 text-xs text-gray-500">{detail}</Text>
              </View>
              <View className="items-end">
                <Text className="font-bold text-text">{total}</Text>
                <Text className={`mt-1 text-xs font-semibold ${status === "Selesai" ? "text-emerald-700" : "text-amber-700"}`}>
                  {status}
                </Text>
              </View>
            </View>
          </AppCard>
        ))}
      </View>
    </ScrollView>
  );
}
