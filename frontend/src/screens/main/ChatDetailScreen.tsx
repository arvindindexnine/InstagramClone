import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useTheme } from '../../theme/ThemeContext';
import { GET_MESSAGES } from '../../graphql/chat/messages.query';
import { SEND_MESSAGE } from '../../graphql/chat/sendMessage.mutation';
import { MESSAGE_RECEIVED } from '../../graphql/chat/messageReceived.subscription';
import { ChatStackParamList } from '../../navigation/AppNavigator';
import { styles } from '../../styles/main/ChatDetailScreen.styles';

type RouteProps = RouteProp<ChatStackParamList, 'ChatDetail'>;
type NavProp = NativeStackNavigationProp<ChatStackParamList, 'ChatDetail'>;

type Message = {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export default function ChatDetailScreen() {
  const { theme } = useTheme();
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProp>();
  const { chatId, otherUserId, otherUsername } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [activeChatId, setActiveChatId] = useState<string>(chatId || '');
  const listRef = useRef<FlatList>(null);

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

  const { data } = useQuery(GET_MESSAGES, { 
    variables: { chatId: activeChatId },
    skip: !activeChatId,
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useSubscription(MESSAGE_RECEIVED, {
    variables: { chatId: activeChatId },
    skip: !activeChatId,
    onData: ({ data: subData }) => {
      const newMsg = subData.data?.messageReceived;
      if (newMsg) {
        setMessages(prev => {
          // Check if message already exists (avoid duplicates)
          const exists = prev.some(msg => msg._id === newMsg._id);
          if (exists) return prev;
          return [...prev, newMsg];
        });
      }
    },
  });

  useEffect(() => {
    if (data?.getMessages) {
      const sortedMessages = [...data.getMessages].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(sortedMessages);
    }
  }, [data]);

  async function handleSend() {
    if (!text.trim() || !currentUserId) return;

    const input = { 
      chatId: activeChatId || undefined, 
      receiverId: otherUserId, 
      senderId: currentUserId,
      text: text.trim() 
    };
    
    console.log('[CHAT] Sending message with input:', input);
    
    const optimisticMessage: Message = {
      _id: `temp-${Date.now()}`,
      chatId: activeChatId,
      senderId: currentUserId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, optimisticMessage]);
    setText('');

    try {
      const result = await sendMessage({ variables: { input } });
      const newMessage = result.data?.sendMessage;
      
      console.log('[CHAT] Message sent successfully:', newMessage);
      
      if (newMessage) {
        setMessages(prev => 
          prev.map(msg => 
            msg._id === optimisticMessage._id ? newMessage : msg
          )
        );
        
        if (!activeChatId) {
          console.log('[CHAT] Setting new chatId:', newMessage.chatId);
          setActiveChatId(newMessage.chatId);
        }
      }
    } catch (e) {
      console.log('[CHAT] Send error:', e);
      setMessages(prev => 
        prev.filter(msg => msg._id !== optimisticMessage._id)
      );
    }
  }

  function renderMessage({ item }: { item: Message }) {
    const isMe = item.senderId === currentUserId;
    return (
      <View style={[
        styles.bubble, 
        isMe 
          ? [styles.bubbleRight, { backgroundColor: theme.primary }]
          : [styles.bubbleLeft, { backgroundColor: theme.inputBackground }]
      ]}>
        <Text style={[styles.bubbleText, { color: isMe ? '#fff' : theme.text }]}>{item.text}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.header, { borderBottomColor: theme.inputBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backBtn, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{otherUsername || otherUserId}</Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderMessage}
        contentContainerStyle={[
          styles.messageList,
          messages.length === 0 && styles.emptyMessageList
        ]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: theme.textMuted }]}>No messages yet</Text>
          </View>
        }
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={[styles.inputRow, { borderTopColor: theme.inputBorder }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          placeholderTextColor={theme.placeholder}
        />
        <TouchableOpacity style={[styles.sendBtn, { backgroundColor: theme.primary }]} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
