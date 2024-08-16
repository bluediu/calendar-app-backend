import { UserEntity } from '../../domain/entities';

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, name, email, password } = object;

    return new UserEntity(_id, name, email, password);
  }
}
