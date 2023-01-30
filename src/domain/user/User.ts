import { AggregateRoot } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

@Expose()
export default class User extends AggregateRoot {
  private readonly stamina: number;
  private readonly reliability: number;
  private createdAt: Date;
  private readonly image: string;
  constructor(
    private readonly id: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly password: string,
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

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getDescription(): string {
    return this.description;
  }
  getSports(): string[] {
    return [...this.sports];
  }
  getReliability(): number {
    return this.reliability;
  }
  getDate(): Date {
    return this.createdAt;
  }
  getStamina(): number {
    return this.stamina;
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

  get _id() {
    return this.id;
  }
}
