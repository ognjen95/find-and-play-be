import { BadRequestException } from '@nestjs/common/exceptions';
import { AggregateRoot } from '@nestjs/cqrs';
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

  get _admins() {
    return [...this.admins];
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
    const participants = [];

    participants.push(participant);

    this.participants = participants;
  }

  addNewEventRequest(eventRequest: EventRequest) {
    const isAlreadyRequestSent = this.eventRequests.some(
      (req) => req._userId === eventRequest._userId,
    );

    if (isAlreadyRequestSent) {
      throw new BadRequestException('Request already sent');
    }

    const alreadyJoinedEvent = this.participants.some(
      (participant) => participant.getId() === eventRequest._userId,
    );

    if (alreadyJoinedEvent) {
      throw new BadRequestException('User already joined this event');
    }

    this.eventRequests.push(eventRequest);
  }
}
