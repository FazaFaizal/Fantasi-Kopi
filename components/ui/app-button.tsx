import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
};

export function AppButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary rounded-button py-4 items-center"
    >
      <Text className="text-white font-semibold text-base">{title}</Text>
    </TouchableOpacity>
  );
}