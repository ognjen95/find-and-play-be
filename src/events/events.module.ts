import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Sport } from 'src/sports/entities/sport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Sport])],
  providers: [EventsResolver, EventsService],
})
export class EventsModule {}
