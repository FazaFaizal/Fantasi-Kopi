import { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { Colors } from "@/constants/colors";

type Props = TextInputProps & {
  label: string;
  error?: string;
  leading?: ReactNode;
};

export function AppInput({ label, error, leading, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-text">{label}</Text>
      <View
        className={`min-h-[54px] flex-row items-center rounded-input border bg-white px-4 ${
          error ? "border-primary" : "border-gray-200"
        }`}
      >
        {leading}
        <TextInput
          {...props}
          className="flex-1 text-base text-text"
          placeholderTextColor={Colors.muted}
          autoCapitalize={props.autoCapitalize ?? "none"}
        />
      </View>
      {error ? <Text className="mt-1 text-xs text-primary">{error}</Text> : null}
    </View>
  );
}
