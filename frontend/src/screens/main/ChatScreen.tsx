import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';
import { useTheme } from '../../theme/ThemeContext';
import { GET_USER_CHATS } from '../../graphql/chat/chats.query';
import { ChatStackParamList } from '../../navigation/AppNavigator';

type ChatNavProp = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

type ChatItem = {
  chatId: string;
  otherUserId: string;
  otherUsername: string;
  lastMessage: string;
  updatedAt: string;
};

export default function ChatScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<ChatNavProp>();
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    loadUserId();
  }, []);

  async function loadUserId() {
    try {
      const stored = await AsyncStorage.getItem('user_data');
      if (stored) {
        const user = JSON.parse(stored);
        setCurrentUserId(user._id);
      }
    } catch (e) {
      console.log('Error loading user:', e);
    }
  }

  const { data, loading, refetch } = useQuery(GET_USER_CHATS, {
    variables: { userId: currentUserId },
    skip: !currentUserId,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (currentUserId) {
        console.log('ChatScreen focused, refetching chats');
        refetch();
      }
    }, [currentUserId, refetch])
  );

  console.log('ChatScreen data:', data);
  console.log('Current user ID:', currentUserId);

  const chats: ChatItem[] = data?.getUserChats ?? [];
  
  console.log('Chats count:', chats.length);

  function renderChat({ item }: { item: ChatItem }) {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatDetail', {
          chatId: item.chatId,
          otherUserId: item.otherUserId,
          otherUsername: item.otherUsername,
        })}
      >
        <View style={[styles.avatar, { backgroundColor: theme.inputBackground }]} />
        <View style={styles.chatInfo}>
          <Text style={[styles.username, { color: theme.text }]}>{item.otherUsername}</Text>
          <Text style={[styles.lastMessage, { color: theme.textMuted }]} numberOfLines={1}>
            {item.lastMessage || 'No messages yet'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.inputBorder }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Messages</Text>
        <TouchableOpacity 
          onPress={() => {
            console.log('Manual refresh triggered');
            refetch();
          }}
          style={{ padding: 8 }}
        >
          <Text style={{ color: theme.primary, fontSize: 16 }}>↻</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>Loading...</Text>
      ) : chats.length === 0 ? (
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>No conversations yet</Text>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={item => item.chatId}
          renderItem={renderChat}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  chatInfo: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 3,
  },
  lastMessage: {
    fontSize: 13,
  },
});
