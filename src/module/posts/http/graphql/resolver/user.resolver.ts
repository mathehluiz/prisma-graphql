import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { User } from '../type/user.type';
import { CreateUserInput } from '../type/create-user-input.type';
import { Post } from '../type/post.type';
import { CreatePostInput } from '../type/create-post-input.type';
import { PubSub } from 'graphql-subscriptions';
import { UserManagementService } from '@src/module/posts/core/service/user-management.service';
import { PostManagementService } from '@src/module/posts/core/service/post-management.service';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userManagementService: UserManagementService,
    private readonly postManagementService: PostManagementService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('CreateUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.userManagementService.create(createUserInput);
    return user;
  }

  @Mutation(() => Post)
  async createPost(
    @Args('CreatePostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    const post = await this.postManagementService.create(createPostInput);
    pubSub.publish('postCreated', { postCreated: post });
    return post;
  }

  @Query(() => User)
  async getUser(@Args('id') id: string) {
    try {
      return this.userManagementService.getUserById(id);
    } catch (error) {
      console.log(error);
      throw new Error('Error getting user profile');
    }
  }

  @ResolveField('posts')
  async posts(@Parent() user: User) {
    return this.postManagementService.getPostsByAuthor(user.id);
  }

  @Subscription(() => Post, {
    name: 'postCreated',
    filter: (payload, variables) => {
      return payload.postCreated.authorId === variables.authorId;
    },
    resolve: (payload) => {
      return payload.postCreated;
    },
  })
  postCreated(@Args('authorId') authorId: string) {
    console.log('new post created for author: ', authorId);
    return pubSub.asyncIterator('postCreated');
  }
}
