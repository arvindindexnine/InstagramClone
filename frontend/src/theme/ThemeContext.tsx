import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from './themes';

const ThemeContext = createContext({
  theme: darkTheme,
  isDark: true,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  async function loadSavedTheme() {
    try {
      const saved = await AsyncStorage.getItem('isDarkTheme');
      if (saved === 'false') {
        setIsDark(false);
      }
    } catch (e) {
    }
  }

  function toggleTheme() {
    const newValue = !isDark;
    setIsDark(newValue);
    AsyncStorage.setItem('isDarkTheme', newValue.toString()).catch(() => {

    });
  }

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}