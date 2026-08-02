import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <Text className="text-2xl font-bold text-text">Profil</Text>
      <Text className="text-gray-500 text-center mt-2">
        Informasi pengguna dan pengaturan aplikasi.
      </Text>
    </View>
  );
}
