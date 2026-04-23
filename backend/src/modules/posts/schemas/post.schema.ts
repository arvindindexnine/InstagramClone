import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Post {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  userId: string;

  @Prop({ required: true })
  @Field()
  mediaUrl: string;

  @Prop({ default: '' })
  @Field({ nullable: true })
  caption: string;

  @Prop({ required: true, enum: ['image', 'video'] })
  @Field()
  type: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
