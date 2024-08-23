import { EventEntity } from '../entities';

import { CreateEventDto } from '../dtos';

import { IUpdateProps, IDeleteProps } from '../../interfaces';

export abstract class EventDatasource {
  abstract listEvents(): Promise<EventEntity[]>;

  abstract createEvent(event: CreateEventDto): Promise<EventEntity>;

  abstract updateEvent(params: IUpdateProps): Promise<EventEntity>;

  abstract deleteEvent(params: IDeleteProps): Promise<void>;
}
