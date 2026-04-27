import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field({ nullable: true })
  chatId?: string;

  @Field()
  receiverId: string;

  @Field()
  senderId: string;

  @Field()
  text: string;
}
