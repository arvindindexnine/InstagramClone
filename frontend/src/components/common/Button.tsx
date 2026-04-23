import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
};

export default function Button({ label, onPress, variant = 'primary' }: Props) {
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[styles.button, isOutline ? styles.outline : styles.primary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, isOutline ? styles.outlineLabel : styles.primaryLabel]}>
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
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.buttonOutlineBorder,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#fff',
  },
  outlineLabel: {
    color: colors.buttonOutlineText,
  },
});