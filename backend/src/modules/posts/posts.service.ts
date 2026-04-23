import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(caption: string, mediaUrl: string, type: string, userId: string): Promise<Post> {
    const post = new this.postModel({ caption, mediaUrl, type, userId });
    return post.save();
  }

  async getFeed(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: -1 });
  }

  async getUserPosts(userId: string): Promise<Post[]> {
    return this.postModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getReels(): Promise<Post[]> {
    return this.postModel.find({ type: 'video' }).sort({ createdAt: -1 });
  }
}
