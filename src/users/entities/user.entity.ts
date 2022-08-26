import { ObjectType, Field } from '@nestjs/graphql';
import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ select: false })
  password: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column({ default: 0 })
  rating: number;

  @Field()
  @Column({ default: 0 })
  playedEvents: number;

  @Field(() => [String])
  @Column('text', { array: true })
  interests: string[];

  @OneToMany(() => Event, (event) => event)
  @Field(() => [Event], { nullable: true })
  events: Event[];
}
