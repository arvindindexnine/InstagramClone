import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './src/graphql/client';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { setTokenChangeListener } from './src/screens/auth/LoginScreen';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  async function checkToken() {
    const stored = await AsyncStorage.getItem('auth_token');
    setToken(stored);
    setChecked(true);
  }

  useEffect(() => {
    checkToken();
    setTokenChangeListener(checkToken);
  }, []);

  if (!checked) return null;

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {token ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </ApolloProvider>
    </ThemeProvider>
  );
}
