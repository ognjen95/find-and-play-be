import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsResolver } from './sports.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  providers: [SportsResolver, SportsService],
  exports: [SportsService],
})
export class SportsModule {}
