import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  mediaUrl: string;

  @Field({ nullable: true })
  caption?: string;

  @Field()
  type: string;
}
