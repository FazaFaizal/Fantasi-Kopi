import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
  className?: string;
};

export function AppCard({ children, className = "" }: Props) {
  return (
    <View className={`rounded-card border border-gray-100 bg-surface p-4 shadow-sm ${className}`}>
      {children}
    </View>
  );
}
