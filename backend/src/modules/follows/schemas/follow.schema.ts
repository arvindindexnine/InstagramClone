import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type FollowDocument = Follow & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Follow {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  followerId: string;

  @Prop({ required: true })
  @Field()
  followingId: string;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
