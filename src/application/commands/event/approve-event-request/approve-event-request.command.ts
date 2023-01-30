export class ApproveEventRequestCommand {
  constructor(
    public readonly eventRequestId: string,
    public readonly userId: string,
  ) {}
}
