import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { AppCard } from "@/components/ui/app-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Colors } from "@/constants/colors";

export default function CustomerMenuScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 pb-10 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        eyebrow="Fantasi Coffee"
        title="Menu hari ini"
        description="Pilih minuman dan makanan favoritmu."
      />
      <View className="mt-6 gap-3">
        {[
          ["Es Kopi Susu", "Kopi", "Rp 28.000", "cafe-outline"],
          ["Matcha Latte", "Non Kopi", "Rp 34.000", "wine-outline"],
          ["Croissant", "Makanan", "Rp 26.000", "restaurant-outline"],
        ].map(([name, category, price, icon]) => (
          <AppCard key={name}>
            <View className="flex-row items-center">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                <Ionicons name={icon as never} size={24} color={Colors.primary} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-bold text-text">{name}</Text>
                <Text className="mt-1 text-sm text-gray-500">{category}</Text>
              </View>
              <Text className="font-bold text-primary">{price}</Text>
            </View>
          </AppCard>
        ))}
      </View>
      <View className="mt-8 rounded-card bg-white p-5">
        <Text className="text-lg font-bold text-text">Pemesanan customer</Text>
        <Text className="mt-2 text-sm leading-5 text-gray-500">
          Keranjang dan checkout akan hadir pada Iterasi 4. Akun customer sudah siap digunakan.
        </Text>
      </View>
    </ScrollView>
  );
}
