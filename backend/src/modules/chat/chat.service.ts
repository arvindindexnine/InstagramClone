import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserChats(userId: string): Promise<any[]> {
    console.log('[CHAT SERVICE] getUserChats called for userId:', userId);
    
    const chats = await this.chatModel
      .find({ participants: userId })
      .sort({ updatedAt: -1 });

    console.log('[CHAT SERVICE] Found chats:', chats.length);

    const results: any[] = [];

    for (const chat of chats) {
      const lastMsg = await this.messageModel
        .findOne({ chatId: chat._id.toString() })
        .sort({ createdAt: -1 });

      const otherUserId = chat.participants.find(p => p !== userId) || '';
      
      let otherUsername = otherUserId;
      if (otherUserId && otherUserId.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          const otherUser = await this.userModel.findById(otherUserId).select('username');
          otherUsername = otherUser?.username || otherUserId;
        } catch (error) {
          console.log('Error finding user:', error);
          otherUsername = otherUserId;
        }
      }

      const chatSummary = {
        chatId: chat._id.toString(),
        otherUserId,
        otherUsername,
        lastMessage: lastMsg?.text || '',
        updatedAt: chat.updatedAt,
      };

      console.log('[CHAT SERVICE] Chat summary:', chatSummary);
      results.push(chatSummary);
    }

    console.log('[CHAT SERVICE] Returning results:', results.length);
    return results;
  }

  async deleteAllChats(): Promise<boolean> {
    await this.chatModel.deleteMany({});
    return true;
  }

  async deleteAllMessages(): Promise<boolean> {
    await this.messageModel.deleteMany({});
    return true;
  }

  async getMessages(chatId: string): Promise<Message[]> {
    return this.messageModel.find({ chatId }).sort({ createdAt: 1 });
  }

  async getOrCreateChat(userA: string, userB: string): Promise<string> {
    console.log('[CHAT SERVICE] getOrCreateChat called:', { userA, userB });
    
    const existing = await this.chatModel.findOne({
      participants: { $all: [userA, userB] },
    });

    if (existing) {
      console.log('[CHAT SERVICE] Found existing chat:', existing._id.toString());
      return existing._id.toString();
    }

    console.log('[CHAT SERVICE] Creating new chat');
    const newChat = await this.chatModel.create({
      participants: [userA, userB],
    });

    console.log('[CHAT SERVICE] New chat created:', newChat._id.toString());
    return newChat._id.toString();
  }

  async sendMessage(text: string, receiverId: string, senderId: string, chatId?: string): Promise<Message> {
    console.log('[CHAT SERVICE] sendMessage called:', { text, receiverId, senderId, chatId });
    
    let actualChatId = chatId;

    if (!actualChatId) {
      console.log('[CHAT SERVICE] No chatId provided, creating/finding chat');
      actualChatId = await this.getOrCreateChat(senderId, receiverId);
      console.log('[CHAT SERVICE] Got chatId:', actualChatId);
    }

    const message = await this.messageModel.create({
      chatId: actualChatId,
      senderId,
      text,
    });

    console.log('[CHAT SERVICE] Message created:', message);

    await this.chatModel.findByIdAndUpdate(actualChatId, { 
      updatedAt: new Date() 
    });

    console.log('[CHAT SERVICE] Chat updated with new timestamp');

    return message;
  }
}
