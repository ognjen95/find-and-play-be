export class QueryOptionsDto {
  search?: string;

  paginationOptions?: {
    take?: number;
    skip?: number;
    orderBy?: 'asc' | 'desc';
    cursor?: {
      id?: string;
    };
  };
}
