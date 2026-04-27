import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import HomeScreen from '../screens/main/HomeScreen';
import ReelsScreen from '../screens/main/ReelsScreen';
import SearchScreen from '../screens/main/SearchScreen';
import ChatScreen from '../screens/main/ChatScreen';
import ChatDetailScreen from '../screens/main/ChatDetailScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

export type ChatStackParamList = {
  ChatList: undefined;
  ChatDetail: { chatId: string; otherUserId: string; otherUsername?: string };
};

const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();

function ChatNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatList" component={ChatScreen} />
      <ChatStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </ChatStack.Navigator>
  );
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const { theme } = useTheme();
  const icons: Record<string, string> = {
    Home: '⌂',
    Reels: '▶',
    Search: '⌕',
    Chat: '✉',
    Profile: '◯',
  };
  return (
    <Text style={{ fontSize: 22, color: focused ? theme.text : theme.textMuted }}>
      {icons[label]}
    </Text>
  );
}

export default function AppNavigator() {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.inputBorder,
          height: 56,
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
