import { AggregateRoot } from '@nestjs/cqrs';

export class EventRequest extends AggregateRoot {
  private readonly isApproved = false;

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
