import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database/EntitySchemaFactory';
import User from '../User';
import { UserModel } from './user.model';

@Injectable()
export class UserSchemaFactory implements EntitySchemaFactory<UserModel, User> {
  create(user: User): UserModel {
    return {
      id: user.getId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      description: user.getDescription(),
      sports: user.getSports(),
      location: user.getLocation(),
      image: user.getImage() ?? '',
      reliability: user.getReliability(),
      createdAt: user.getDate(),
      stamina: user.getStamina(),
    };
  }

  createFromSchema(userModel: UserModel): User {
    return new User(
      userModel.id,
      userModel.firstName,
      userModel.lastName,
      userModel.email,
      userModel.description,
      userModel.sports,
      userModel.location,
    );
  }
}
