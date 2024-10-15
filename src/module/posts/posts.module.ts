import { Module } from '@nestjs/common';
import { UserManagementService } from './core/service/user-management.service';
import { UserRepository } from './persistence/repository/user.repository';
import { PostRepository } from './persistence/repository/post.repository';
import { PostManagementService } from './core/service/post-management.service';
import { PersistenceModule } from '@src/shared/module/persistence/prisma/persistence.module';
import { UserResolver } from './http/graphql/resolver/user.resolver';

@Module({
  imports: [PersistenceModule],
  providers: [
    UserResolver,
    UserManagementService,
    PostManagementService,
    UserRepository,
    PostRepository,
  ],
})
export class PostsModule {}
