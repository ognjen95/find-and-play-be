import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { SportsModule } from './sports/sports.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    UsersModule,
    SportsModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'fap',
      password: 'asdasd123...',
      database: 'find-and-play-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EventsModule,
  ],
})
export class AppModule {}
