import { Text, View } from "react-native";
import { roleLabel, Role } from "@/features/auth/types";

const roleStyles: Record<Role, { background: string; text: string }> = {
  admin: { background: "bg-red-50", text: "text-primary" },
  kasir: { background: "bg-amber-50", text: "text-amber-700" },
  pengguna: { background: "bg-blue-50", text: "text-blue-700" },
};

export function RoleBadge({ role }: { role: Role }) {
  const styles = roleStyles[role];
  return (
    <View className={`self-start rounded-full px-3 py-1 ${styles.background}`}>
      <Text className={`text-xs font-bold ${styles.text}`}>{roleLabel(role)}</Text>
    </View>
  );
}
