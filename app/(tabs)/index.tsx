import { AppCard } from "@/components/ui/app-card";
import { Colors } from "@/constants/colors";
import { ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-5 pt-14 pb-6">
        <Text className="text-3xl font-bold text-text">Manguna Coffee</Text>
        <Text className="text-gray-500 mt-1">
          Ringkasan operasional hari ini
        </Text>

        <View className="mt-6">
          <View
            style={{ backgroundColor: Colors.primary }}
            className="rounded-card p-6"
          >
            <Text className="text-white/80">Penjualan Hari Ini</Text>
            <Text className="text-white text-3xl font-bold mt-2">
              Rp 2.450.000
            </Text>

            <View className="flex-row justify-between mt-6">
              <View>
                <Text className="text-white/70 text-xs">Transaksi</Text>
                <Text className="text-white text-xl font-semibold mt-1">
                  42
                </Text>
              </View>

              <View>
                <Text className="text-white/70 text-xs">Produk</Text>
                <Text className="text-white text-xl font-semibold mt-1">
                  128
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text className="text-lg font-bold text-text mt-8 mb-4">Shortcut</Text>

        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] mb-4">
            <AppCard>
              <Text className="text-text font-semibold">Buka POS</Text>
              <Text className="text-gray-500 text-sm mt-1">
                Mulai transaksi baru
              </Text>
            </AppCard>
          </View>

          <View className="w-[48%] mb-4">
            <AppCard>
              <Text className="text-text font-semibold">Kelola Produk</Text>
              <Text className="text-gray-500 text-sm mt-1">
                Tambah atau edit menu
              </Text>
            </AppCard>
          </View>
        </View>

        <Text className="text-lg font-bold text-text mt-4 mb-4">
          Pesanan Terbaru
        </Text>

        <View className="gap-3">
          {["Es Kopi Susu", "Cappuccino", "Croissant"].map((item) => (
            <AppCard key={item}>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-semibold text-text">{item}</Text>
                  <Text className="text-gray-500 text-sm mt-1">Meja 03</Text>
                </View>

                <Text className="font-bold text-primary">Rp 28.000</Text>
              </View>
            </AppCard>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
