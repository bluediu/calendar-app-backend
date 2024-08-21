import { EventEntity } from '../../domain/entities';

export class EventMapper {
  static eventEntityFromObject(object: { [key: string]: any }) {
    const { _id, title, notes, start, end, user } = object;

    return new EventEntity(_id, title, notes, start, end, user);
  }
}
