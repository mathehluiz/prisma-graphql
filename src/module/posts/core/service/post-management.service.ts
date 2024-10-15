import { Injectable } from '@nestjs/common';
import { PostModel } from '../model/post.model';
import { PostRepository } from '../../persistence/repository/post.repository';

export interface CreatePostDto {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

@Injectable()
export class PostManagementService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(input: CreatePostDto) {
    const post = PostModel.create(input);
    await this.postRepository.save(post);
    return post;
  }

  async getPostById(id: string) {
    return this.postRepository.findOneBy({ id });
  }

  async getPostsByAuthor(authorId: string) {
    return this.postRepository.findManyBy({ authorId });
  }
}
