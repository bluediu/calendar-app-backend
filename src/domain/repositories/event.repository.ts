import { EventEntity } from '../entities';

import { CreateEventDto } from '../dtos';

export abstract class EventRepository {
  abstract createEvent(event: CreateEventDto): Promise<EventEntity>;
}
