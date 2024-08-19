import { EventEntity } from '../entities';

import { CreateEventDto } from '../dtos';

export abstract class EventDatasource {
  abstract createEvent(event: CreateEventDto): Promise<EventEntity>;
}
