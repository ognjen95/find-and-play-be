import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './presentation/graphql/user/user.module';
import { join } from 'path';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: ['http://localhost:3000', 'https://dev.un1flix.com'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200,
        allowedHeaders: [
          'Content-Type',
          'Accept',
          'Authorization',
          'Access-Control-Allow-Credentials',
          'Access-Control-Allow-Origin',
          'Origin',
          'Access-Control-Allow-Methods',
        ],
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PrismaModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AtGuard,
  //   },
  //   {
  //     provide: 'PUB_SUB',
  //     useValue: new PubSub(),
  //   },
  // ],
})
export class AppModule {}
