import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../theme/ThemeContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { LOGIN_MUTATION } from '../../graphql/auth/login.mutation';
import { styles } from '../../styles/auth/LoginScreen.styles';

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

let tokenChangeCallback: (() => void) | null = null;

export function setTokenChangeListener(fn: () => void) {
  tokenChangeCallback = fn;
}

export function notifyTokenChange() {
  tokenChangeCallback?.();
}

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<LoginNavProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [loginUser] = useMutation(LOGIN_MUTATION);

  async function handleLogin() {
    if (!username || !password) return;

    setIsLoading(true);
    setError('');

    try {
      const { data } = await loginUser({
        variables: { input: { identifier: username, password } },
      });

      await AsyncStorage.setItem('auth_token', data.login.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(data.login.user));
      notifyTokenChange();
    } catch (e: any) {
      if (e.message.includes('Network request failed')) {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError(e.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreateAccount() {
    navigation.navigate('Register');
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.language, { color: theme.textMuted }]}>English (UK) ▾</Text>

        <Text style={[styles.logo, { color: theme.text }]}>Instagram</Text>

        <View style={styles.form}>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Phone number, username or email"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            label={isLoading ? 'Logging in...' : 'Log in'}
            onPress={handleLogin}
          />
        </View>

        <Text style={[styles.forgotPassword, { color: theme.textMuted }]}>
          Forgot password?
        </Text>

        <View style={styles.createAccountWrapper}>
          <Button
            label="Create new account"
            onPress={handleCreateAccount}
            variant="outline"
          />
        </View>

        <Text style={[styles.footer, { color: theme.footer }]}>Meta</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
