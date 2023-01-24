import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';

export class FindManyEventsQuery {
  constructor(public readonly queryOptions?: QueryOptionsDto) {}
}
