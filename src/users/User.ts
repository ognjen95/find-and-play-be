import { AggregateRoot } from '@nestjs/cqrs';

export default class User extends AggregateRoot {
  private readonly stamina: number;
  private readonly reliability: number;
  private readonly createdAt: Date;
  private readonly image: string;
  constructor(
    private readonly id: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly description: string,
    private readonly sports: string[],
    private readonly location: {
      lng: number;
      lat: number;
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
  } {
    return {
      ...this.location,
    };
  }
}
