import { View, Text } from 'react-native';

export default function ProductsScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <Text className="text-2xl font-bold text-text">Produk</Text>
      <Text className="text-gray-500 text-center mt-2">
        Tahap berikutnya: list produk, search, tambah, edit, dan hapus.
      </Text>
    </View>
  );
}