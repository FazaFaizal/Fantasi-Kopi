import { View } from 'react-native';
import { ReactNode } from 'react';

export function AppCard({ children }: { children: ReactNode }) {
  return (
    <View className="bg-surface rounded-card p-4 shadow-sm border border-gray-100">
      {children}
    </View>
  );
}