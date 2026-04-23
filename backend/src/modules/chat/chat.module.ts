import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    ChatService,
    ChatResolver,
    { provide: 'PUB_SUB', useValue: new PubSub() },
  ],
})
export class ChatModule {}
