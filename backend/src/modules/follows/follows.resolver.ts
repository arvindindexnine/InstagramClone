import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { Follow } from './schemas/follow.schema';

const TEMP_USER_ID = 'user_default';

@Resolver()
export class FollowsResolver {
  constructor(private followsService: FollowsService) {}

  @Mutation(() => Follow)
  async followUser(@Args('userId') userId: string): Promise<Follow> {
    return this.followsService.followUser(TEMP_USER_ID, userId);
  }

  @Mutation(() => Boolean)
  async unfollowUser(@Args('userId') userId: string): Promise<boolean> {
    return this.followsService.unfollowUser(TEMP_USER_ID, userId);
  }

  @Query(() => Number)
  async getFollowersCount(@Args('userId') userId: string): Promise<number> {
    return this.followsService.getFollowersCount(userId);
  }

  @Query(() => Number)
  async getFollowingCount(@Args('userId') userId: string): Promise<number> {
    return this.followsService.getFollowingCount(userId);
  }
}
