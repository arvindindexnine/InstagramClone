import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
};

export default function Button({ label, onPress, variant = 'primary' }: Props) {
  const { theme } = useTheme();
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        isOutline 
          ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.buttonOutlineBorder }
          : { backgroundColor: theme.primary }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.label, 
        { color: isOutline ? theme.buttonOutlineText : '#fff' }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});