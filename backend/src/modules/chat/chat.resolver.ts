import { Resolver, Query, Mutation, Subscription, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ChatService } from './chat.service';
import { Message } from './schemas/message.schema';
import { ChatSummary } from './dto/chat-summary';
import { SendMessageInput } from './dto/send-message.input';

const TEMP_USER_ID = 'user_default';
const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

@Resolver()
export class ChatResolver {
  constructor(
    private chatService: ChatService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(() => [ChatSummary])
  async getUserChats(@Args('userId') userId: string) {
    return this.chatService.getUserChats(userId);
  }

  @Query(() => [Message])
  async getMessages(@Args('chatId') chatId: string): Promise<Message[]> {
    return this.chatService.getMessages(chatId);
  }

  @Mutation(() => Message)
  async sendMessage(@Args('input') input: SendMessageInput): Promise<Message> {
    const { text, receiverId, chatId } = input;
    const message = await this.chatService.sendMessage(text, receiverId, TEMP_USER_ID, chatId);
    this.pubSub.publish(`${MESSAGE_RECEIVED}_${message.chatId}`, {
      messageReceived: message,
    });
    return message;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) =>
      payload.messageReceived.chatId === variables.chatId,
  })
  messageReceived(@Args('chatId') chatId: string) {
    return this.pubSub.asyncIterableIterator(`${MESSAGE_RECEIVED}_${chatId}`);
  }
}
