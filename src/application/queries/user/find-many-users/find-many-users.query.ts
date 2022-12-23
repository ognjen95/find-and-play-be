import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';

export class FindManyUsersQuery {
  constructor(public readonly queryOptions?: QueryOptionsDto) {}
}
