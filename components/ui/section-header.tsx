import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-1 pr-4">
        {eyebrow ? (
          <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </Text>
        ) : null}
        <Text className="text-3xl font-bold text-text">{title}</Text>
        {description ? (
          <Text className="mt-2 text-sm leading-5 text-gray-500">{description}</Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <TouchableOpacity
          onPress={onAction}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          className="h-11 w-11 items-center justify-center rounded-2xl bg-primary"
        >
          <Ionicons name="add" size={24} color={Colors.surface} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
