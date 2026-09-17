import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/auth-context";

export default function Index() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (user.role === "admin") {
    return <Redirect href="/dashboard" />;
  }

  if (user.role === "kasir") {
    return <Redirect href="/pos" />;
  }

  return <Redirect href="/menu" />;
}
