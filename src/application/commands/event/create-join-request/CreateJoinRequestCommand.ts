export class CreateJoinRequestCommand {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
  ) {}
}
