import { AggregateRoot } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class EventRequest extends AggregateRoot {
  private readonly isApproved = false;

  private readonly requestFrom?: User;

  private readonly requestsFor?: User[] = [];

  constructor(
    private readonly id: string,

    private readonly eventId: string,

    private readonly userId: string,
  ) {
    super();
  }

  get _id() {
    return this.id;
  }

  get _eventId() {
    return this.eventId;
  }

  get _userId() {
    return this.userId;
  }

  get _isApproved() {
    return this.isApproved;
  }

  get toObject() {
    return {
      id: this.id,
      eventId: this.eventId,
      userId: this.userId,
      isApproved: this.isApproved,
    };
  }
}
