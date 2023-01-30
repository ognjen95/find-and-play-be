import { BadRequestException } from '@nestjs/common/exceptions';
import { AggregateRoot } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import User from '../user/User';
import { EventRequest } from './EventRequest';

export default class Event extends AggregateRoot {
  private participants: User[] = [];
  private admins?: User[] = [];
  private createdAt: Date;
  private image: string;
  private eventRequests: EventRequest[] = [];

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
    return [...this.participants];
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

  get _id() {
    return this.id;
  }

  get _admins() {
    return plainToInstance(User, this.admins);
  }

  set _createdAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  set _eventRequests(eventReq: EventRequest[]) {
    this.eventRequests = eventReq;
  }

  set _addAdmins(admins: User[]) {
    this.admins = admins;
  }

  addParticipant(participant: User) {
    this.participants.push(participant);
  }

  addNewEventRequest(eventRequest: EventRequest) {
    if (this.eventRequests.length) {
      const eventRequests = plainToInstance(EventRequest, this.eventRequests);

      const isAlreadyRequestSent = eventRequests.some(
        (req) => req._userId === eventRequest._userId,
      );

      if (isAlreadyRequestSent) {
        throw new BadRequestException('Request already sent');
      }
    }
    if (this.participants.length) {
      const participants = plainToInstance(User, this.participants);
      const alreadyJoinedEvent = participants.some(
        (participant) => participant._id === eventRequest._userId,
      );

      if (alreadyJoinedEvent) {
        throw new BadRequestException('User already joined this event');
      }
    }

    this.eventRequests.push(eventRequest);

    return this;
  }
}
