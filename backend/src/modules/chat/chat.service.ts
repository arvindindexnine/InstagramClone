import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async getUserChats(userId: string): Promise<any[]> {
    const chats = await this.chatModel
      .find({ participants: userId })
      .sort({ updatedAt: -1 });

    const results: any[] = [];

    for (const chat of chats) {
      const lastMsg = await this.messageModel
        .findOne({ chatId: chat._id.toString() })
        .sort({ createdAt: -1 });

      const otherUserId = chat.participants.find(p => p !== userId) || '';

      results.push({
        chatId: chat._id.toString(),
        otherUserId,
        lastMessage: lastMsg?.text || '',
      });
    }

    return results;
  }

  async getMessages(chatId: string): Promise<Message[]> {
    return this.messageModel.find({ chatId }).sort({ createdAt: 1 });
  }

  async sendMessage(text: string, receiverId: string, senderId: string, chatId?: string): Promise<Message> {
    let actualChatId = chatId;

    if (!actualChatId) {
      const existing = await this.chatModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (existing) {
        actualChatId = existing._id.toString();
      } else {
        const newChat = await this.chatModel.create({
          participants: [senderId, receiverId],
        });
        actualChatId = newChat._id.toString();
      }
    }

    const message = await this.messageModel.create({
      chatId: actualChatId,
      senderId,
      text,
    });

    await this.chatModel.findByIdAndUpdate(actualChatId, { updatedAt: new Date() });

    return message;
  }
}
