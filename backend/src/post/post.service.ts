import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createPost(
    userId: number,
    content: string,
    image?: string | null,
    video?: string | null,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('Usuario no encontrado');

    const post = this.postRepository.create({
      content,
      image: image ?? null,
      video: video ?? null,
      user,
    } as DeepPartial<Post>); // ✅ aquí el fix

    return await this.postRepository.save(post);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async editPost(postId: number, content: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) throw new Error('Publicación no encontrada');

    post.content = content;
    return this.postRepository.save(post);
  }

  async deletePost(postId: number): Promise<{ success: boolean }> {
    await this.postRepository.delete(postId);
    return { success: true };
  }
}

