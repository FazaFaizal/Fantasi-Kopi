import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="h-16 w-16 items-center justify-center rounded-3xl bg-red-50">
        <ActivityIndicator color={Colors.primary} />
      </View>
      <Text className="mt-5 text-xl font-bold text-text">Fantasi Coffee</Text>
      <Text className="mt-2 text-center text-sm text-gray-500">
        Menyiapkan ruang kerja kamu...
      </Text>
    </View>
  );
}
