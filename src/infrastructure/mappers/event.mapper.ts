import { EventEntity } from '../../domain/entities';

type TDynamicObject = { [key: string]: any };

export class EventMapper {
  static asInstance(object: TDynamicObject): EventEntity {
    const { _id, title, notes, start, end, user } = object;

    return new EventEntity(_id, title, notes, start, end, user);
  }

  static asInstances(arr: TDynamicObject[]): EventEntity[] {
    return arr.map(
      (obj: TDynamicObject) =>
        new EventEntity(
          obj._id,
          obj.title,
          obj.notes,
          obj.start,
          obj.end,
          obj.user
        )
    );
  }
}
