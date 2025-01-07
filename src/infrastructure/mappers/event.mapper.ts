/* Domain */
import { EventEntity } from '../../domain/entities';

/* Types */
import { TDynamicObject } from '../../types';

export class EventMapper {
  static asInstance(object: TDynamicObject): EventEntity {
    const { _id, title, notes, start, end, user } = object;

    return new EventEntity(_id, title, notes, start, end, user);
  }

  static asInstances(arr: TDynamicObject[]): EventEntity[] {
    return arr.map((obj: TDynamicObject) => {
      const user = {
        _id: obj.user._id,
        name: obj.user.name,
        email: obj.user.email,
      };

      return new EventEntity(
        obj._id,
        obj.title,
        obj.notes,
        obj.start,
        obj.end,
        user
      );
    });
  }
}
