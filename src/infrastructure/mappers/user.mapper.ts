/* Domain */
import { TokenEntity, UserEntity } from '../../domain/entities';

/* Types */
import { TDynamicObject } from '../../types';

export class UserMapper {
  static userAsEntity(object: TDynamicObject) {
    const { _id, name, email, password } = object;

    return new UserEntity(_id, name, email, password);
  }

  static userTokenAsEntity(object: TDynamicObject) {
    const { id, name, token } = object;

    return new TokenEntity(id, name, token);
  }
}
