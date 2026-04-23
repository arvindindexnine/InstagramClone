import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Chat {
  @Field(() => ID)
  _id: string;

  @Prop({ type: [String], required: true })
  @Field(() => [String])
  participants: string[];

  @Field(() => String, { nullable: true })
  updatedAt?: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
