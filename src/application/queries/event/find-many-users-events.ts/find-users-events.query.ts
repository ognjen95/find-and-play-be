import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';

export class FindUsersEventsQuery {
  constructor(
    public readonly userId: string,
    public readonly queryOptions?: QueryOptionsDto,
  ) {}
}
