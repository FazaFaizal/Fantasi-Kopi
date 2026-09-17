import "@/global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { AuthProvider, useAuth } from "@/features/auth/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { isLoading, user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={isLoading}>
        <Stack.Screen name="loading" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoading && !user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoading && user?.role === "admin"}>
        <Stack.Screen name="(admin)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoading && user?.role === "kasir"}>
        <Stack.Screen name="(cashier)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoading && user?.role === "pengguna"}>
        <Stack.Screen name="(customer)" />
      </Stack.Protected>
    </Stack>
  );
}
