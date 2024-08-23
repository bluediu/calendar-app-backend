import { EventEntity } from '../entities';

import { CreateEventDto } from '../dtos';

export abstract class EventRepository {
  abstract listEvents(): Promise<EventEntity[]>;

  abstract createEvent(event: CreateEventDto): Promise<EventEntity>;
}
