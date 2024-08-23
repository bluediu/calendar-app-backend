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
import { IUpdateProps, IDeleteProps } from '../../interfaces';

export class EventDatasourceImpl implements EventDatasource {
  private async _validateContext(
    eventId: string,
    token: string
  ): Promise<string> {
    const decoded = jwtDecode<{ id: string }>(token);

    const event = await EventModel.findOne({ _id: eventId });
    if (!event) throw CustomError.badRequest('Event does not exist.');

    // Can change event
    if (event.user.toString() !== decoded.id) {
      throw CustomError.forbidden('You cannot change this event.');
    }

    return decoded.id;
  }

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
    const { token, id, event: data } = params;

    try {
      const userId = await this._validateContext(id, token);

      const newEvent = { ...data, user: userId };
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

  async deleteEvent(params: IDeleteProps): Promise<void> {
    const { token, id } = params;

    try {
      await this._validateContext(id, token);
      await EventModel.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
