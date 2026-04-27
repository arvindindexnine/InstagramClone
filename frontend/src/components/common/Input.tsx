import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
};

export default function Input({ value, onChangeText, placeholder, secureTextEntry }: Props) {
  const { theme } = useTheme();
  
  return (
    <TextInput
      style={[styles.input, { 
        backgroundColor: theme.inputBackground,
        borderColor: theme.inputBorder,
        color: theme.text
      }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
  },
});