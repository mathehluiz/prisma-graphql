import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/module/config/config.module';
import { PostsModule } from './module/posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AppResolver],
})
export class AppModule {}
