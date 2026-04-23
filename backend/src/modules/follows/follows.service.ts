import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from './schemas/follow.schema';

@Injectable()
export class FollowsService {
  constructor(@InjectModel(Follow.name) private followModel: Model<FollowDocument>) {}

  async followUser(followerId: string, followingId: string): Promise<Follow> {
    const existing = await this.followModel.findOne({ followerId, followingId });
    if (existing) return existing;
    
    const follow = new this.followModel({ followerId, followingId });
    return follow.save();
  }

  async unfollowUser(followerId: string, followingId: string): Promise<boolean> {
    await this.followModel.deleteOne({ followerId, followingId });
    return true;
  }

  async getFollowersCount(userId: string): Promise<number> {
    return this.followModel.countDocuments({ followingId: userId });
  }

  async getFollowingCount(userId: string): Promise<number> {
    return this.followModel.countDocuments({ followerId: userId });
  }
}
