import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@apollo/client';
import Input from '../../components/common/Input.tsx';
import Button from '../../components/common/Button.tsx';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { styles } from '../../styles/auth/RegisterScreen.styles';
import { REGISTER_MUTATION } from '../../graphql/auth/register.mutation.ts';

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [registerUser] = useMutation(REGISTER_MUTATION);

  async function handleRegister() {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data } = await registerUser({
        variables: { input: { username, email, password } },
      });

      console.log('Registration successful:', data);
      navigation.navigate('Login');
    } catch (e: any) {
      console.log('Registration error:', e);
      setError(e.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }

  function handleBackPress() {
    navigation.goBack();
  }


  function handleLoginPress() {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create account</Text>

        <View style={styles.form}>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button 
            label={isLoading ? 'Creating account...' : 'Create account'} 
            onPress={handleRegister} 
          />
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text style={styles.loginLink} onPress={handleLoginPress}>
            Log in
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
