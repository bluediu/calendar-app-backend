/* Domain */
import { CreateEventDto } from '../../domain/dtos';
import { EventEntity } from '../../domain/entities';
import { EventDatasource } from '../../domain/datasources';
import { EventRepository } from '../../domain/repositories';

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly eventDatasource: EventDatasource) {}

  listEvents(): Promise<EventEntity[]> {
    return this.eventDatasource.listEvents();
  }

  createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventDatasource.createEvent(createEventDto);
  }
}
