/* Data */
import { EventModel, UserModel } from '../../data/mongodb';

/* Domain */
import { CustomError } from '../../domain/errors';
import { CreateEventDto } from '../../domain/dtos';
import { EventEntity } from '../../domain/entities';
import { EventDatasource } from '../../domain/datasources';

/* Mappers */
import { EventMapper } from '../mappers';

export class EventDatasourceImpl implements EventDatasource {
  async listEvents(): Promise<EventEntity[]> {
    try {
      const events = await EventModel.find();
      return EventMapper.asInstances(events);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async createEvent(event: CreateEventDto): Promise<EventEntity> {
    try {
      const exists = await UserModel.findOne({ _id: event.user });
      if (!exists) throw CustomError.badRequest('User does not exist.');

      const newEvent = new EventModel({ ...event });
      await newEvent.save();

      return EventMapper.asInstance(newEvent);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
