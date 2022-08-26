import { ObjectType, Field } from '@nestjs/graphql';
import { Sport } from 'src/sports/entities/sport.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Event {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Sport)
  @OneToOne(() => Sport)
  sport: Sport;

  @Field()
  @Column({ default: 0 })
  maxNumOfParticipants: number;

  @Field()
  @Column({ default: 0 })
  currentNumOfParticipants: number;

  @Field(() => [String], { defaultValue: [] })
  @Column('text', { array: true, default: [], nullable: true })
  participantIds: string[];

  @ManyToMany(() => User, (user) => user.id)
  @JoinColumn()
  @Field(() => [User], { nullable: true })
  participants: User[];
}
