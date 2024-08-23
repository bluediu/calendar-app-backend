import { jwtDecode } from 'jwt-decode';

/* Data */
import { EventModel, UserModel } from '../../data/mongodb';

/* Domain */
import { CustomError } from '../../domain/errors';
import { CreateEventDto } from '../../domain/dtos';
import { EventEntity } from '../../domain/entities';
import { EventDatasource } from '../../domain/datasources';

/* Mappers */
import { EventMapper } from '../mappers';

/* Interfaces & Types */
import { TDynamicObject } from '../../types';
import { IUpdateProps } from '../../interfaces';

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

  async updateEvent(params: IUpdateProps): Promise<EventEntity> {
    console.log('params', params);

    const { token, id, event: data } = params;

    try {
      const decoded = jwtDecode<{ uid: string }>(token);

      const event = await EventModel.findOne({ _id: id });
      if (!event) throw CustomError.badRequest('Event does not exist.');

      // Can change event
      if (event.user.toString() !== decoded.uid) {
        throw CustomError.forbidden('You cannot update this event.');
      }

      const newEvent = { ...data, user: decoded.uid };
      const updatedEvent = await EventModel.findByIdAndUpdate(id, newEvent, {
        new: true,
      });

      return EventMapper.asInstance(updatedEvent as TDynamicObject);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
