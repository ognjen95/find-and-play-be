import { AggregateRoot } from '@nestjs/cqrs';
import User from '../user/User';

export default class Event extends AggregateRoot {
  private readonly participants?: User[];
  private readonly createdAt: Date;
  private readonly image: string;
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly startTime: Date,
    private readonly endTime: Date,
    private readonly description: string,
    private readonly sports: string[],
    private readonly location: {
      lng: number;
      lat: number;
      city: string;
      state: string;
    },
  ) {
    super();
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getStartTime(): Date {
    return this.startTime;
  }
  getEndTime(): Date {
    return this.endTime;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getParticipants(): User[] {
    return this.participants;
  }
  getDescription(): string {
    return this.description;
  }
  getSports(): string[] {
    return this.sports;
  }
  getImage(): string {
    return this.image;
  }
  getLocation(): {
    lng: number;
    lat: number;
    city: string;
    state: string;
  } {
    return {
      ...this.location,
    };
  }
}
