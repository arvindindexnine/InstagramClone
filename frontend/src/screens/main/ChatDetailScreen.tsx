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
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import colors from '../../theme/colors';
import { GET_MESSAGES } from '../../graphql/chat/messages.query';
import { SEND_MESSAGE } from '../../graphql/chat/sendMessage.mutation';
import { MESSAGE_RECEIVED } from '../../graphql/chat/messageReceived.subscription';
import { ChatStackParamList } from '../../navigation/AppNavigator';
import { styles } from '../../styles/main/ChatDetailScreen.styles';

type RouteProps = RouteProp<ChatStackParamList, 'ChatDetail'>;
type NavProp = NativeStackNavigationProp<ChatStackParamList, 'ChatDetail'>;

const TEMP_USER_ID = 'user_default';

type Message = {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export default function ChatDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProp>();
  const { chatId, otherUserId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const { data } = useQuery(GET_MESSAGES, { variables: { chatId } });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useSubscription(MESSAGE_RECEIVED, {
    variables: { chatId },
    onData: ({ data: subData }) => {
      const newMsg = subData.data?.messageReceived;
      if (newMsg) {
        setMessages(prev => [...prev, newMsg]);
      }
    },
  });

  useEffect(() => {
    if (data?.getMessages) {
      setMessages(data.getMessages);
    }
  }, [data]);

  async function handleSend() {
    if (!text.trim()) return;

    const input = { chatId, receiverId: otherUserId, text: text.trim() };
    setText('');

    try {
      await sendMessage({ variables: { input } });
    } catch (e) {
      console.log('send error', e);
    }
  }

  function renderMessage({ item }: { item: Message }) {
    const isMe = item.senderId === TEMP_USER_ID;
    return (
      <View style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={styles.bubbleText}>{item.text}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{otherUserId}</Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
