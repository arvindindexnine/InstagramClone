import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ChatSummary {
  @Field(() => ID)
  chatId: string;

  @Field()
  otherUserId: string;

  @Field({ nullable: true })
  lastMessage?: string;
}
