import { v4 as uuid } from 'uuid';

export abstract class IdentifiableEntitySchema {
  readonly id: uuid;
  readonly email?: string;
}
