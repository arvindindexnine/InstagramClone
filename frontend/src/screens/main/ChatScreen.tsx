import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';
import colors from '../../theme/colors';
import { GET_USER_CHATS } from '../../graphql/chat/chats.query';
import { ChatStackParamList } from '../../navigation/AppNavigator';

type ChatNavProp = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

const TEMP_USER_ID = 'user_default';

type ChatItem = {
  chatId: string;
  otherUserId: string;
  lastMessage: string;
};

export default function ChatScreen() {
  const navigation = useNavigation<ChatNavProp>();
  const { data, loading } = useQuery(GET_USER_CHATS, {
    variables: { userId: TEMP_USER_ID },
  });

  const chats: ChatItem[] = data?.getUserChats ?? [];

  function renderChat({ item }: { item: ChatItem }) {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatDetail', {
          chatId: item.chatId,
          otherUserId: item.otherUserId,
        })}
      >
        <View style={styles.avatar} />
        <View style={styles.chatInfo}>
          <Text style={styles.username}>{item.otherUserId}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage || 'No messages yet'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : chats.length === 0 ? (
        <Text style={styles.loadingText}>No conversations yet</Text>
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
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBorder,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  loadingText: {
    color: colors.textMuted,
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
    backgroundColor: colors.inputBackground,
  },
  chatInfo: {
    flex: 1,
  },
  username: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 3,
  },
  lastMessage: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
