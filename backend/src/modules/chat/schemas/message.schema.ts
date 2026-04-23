import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Message {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  chatId: string;

  @Prop({ required: true })
  @Field()
  senderId: string;

  @Prop({ required: true })
  @Field()
  text: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
