import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';
import { CreatePostInput } from './dto/create-post.input';

const TEMP_USER_ID = 'user_default';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async getFeed(): Promise<Post[]> {
    return this.postsService.getFeed();
  }

  @Query(() => [Post])
  async getUserPosts(@Args('userId') userId: string): Promise<Post[]> {
    return this.postsService.getUserPosts(userId);
  }

  @Query(() => [Post])
  async getReels(): Promise<Post[]> {
    return this.postsService.getReels();
  }

  @Mutation(() => Post)
  async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
    const { username, caption, mediaUrl, type } = input;
    return this.postsService.createPost(username, caption || '', mediaUrl, type, TEMP_USER_ID);
  }

  @Mutation(() => Boolean)
  async deleteAllPosts(): Promise<boolean> {
    return this.postsService.deleteAllPosts();
  }
}
