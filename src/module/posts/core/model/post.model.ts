import { randomUUID } from 'crypto';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export class PostModel {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  private constructor(data: PostModel) {
    Object.assign(this, data);
  }

  static create(
    data: WithOptional<PostModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): PostModel {
    return new PostModel({
      ...data,
      id: data.id ? data.id : randomUUID(),
      createdAt: data.createdAt ? data.createdAt : new Date(),
      updatedAt: data.updatedAt ? data.updatedAt : new Date(),
      deletedAt: data.deletedAt ? data.deletedAt : null,
    });
  }

  static createFrom(data: PostModel): PostModel {
    return new PostModel(data);
  }
}
