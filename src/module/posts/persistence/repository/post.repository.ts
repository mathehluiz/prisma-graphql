import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultPrismaRepository } from '@src/shared/module/persistence/prisma/default.prisma.repository';
import { PrismaService } from '@src/shared/module/persistence/prisma/prisma.service';
import { PostModel } from '../../core/model/post.model';

type QueryableFields = Prisma.$PostPayload['scalars'];

@Injectable()
export class PostRepository extends DefaultPrismaRepository {
  private readonly model: PrismaService['post'];
  constructor(prismaService: PrismaService) {
    super();
    this.model = prismaService.post;
  }

  async save(post: PostModel): Promise<void> {
    try {
      await this.model.create({
        relationLoadStrategy: 'join',
        data: post,
      });
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }

  async findOneBy(fields: Partial<QueryableFields>): Promise<PostModel | undefined> {
    try {
      const post = await this.model.findFirst({
        relationLoadStrategy: 'join',
        where: fields,
      });
      if (!post) {
        return;
      }

      return PostModel.createFrom(post);
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }

  async findManyBy(fields: Partial<QueryableFields>): Promise<PostModel[]> {
    try {
      const posts = await this.model.findMany({
        relationLoadStrategy: 'join',
        where: fields,
      });

      return posts.map((post) => PostModel.createFrom(post));
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }

  async clear(): Promise<{ count: number }> {
    try {
      return await this.model.deleteMany();
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }
}
