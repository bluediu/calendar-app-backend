import { EventEntity } from '../entities';

import { CreateEventDto } from '../dtos';

import { IUpdateProps } from '../../interfaces';

export abstract class EventDatasource {
  abstract listEvents(): Promise<EventEntity[]>;

  abstract createEvent(event: CreateEventDto): Promise<EventEntity>;

  abstract updateEvent(params: IUpdateProps): Promise<EventEntity>;
}
