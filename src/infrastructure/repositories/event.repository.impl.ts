/* Domain */
import { CreateEventDto } from '../../domain/dtos';
import { EventEntity } from '../../domain/entities';
import { EventDatasource } from '../../domain/datasources';
import { EventRepository } from '../../domain/repositories';

/* Interfaces */
import { IUpdateProps, IDeleteProps } from '../../interfaces';

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly eventDatasource: EventDatasource) {}

  listEvents(): Promise<EventEntity[]> {
    return this.eventDatasource.listEvents();
  }

  createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventDatasource.createEvent(createEventDto);
  }

  updateEvent(params: IUpdateProps): Promise<EventEntity> {
    return this.eventDatasource.updateEvent(params);
  }

  deleteEvent(params: IDeleteProps): Promise<void> {
    return this.eventDatasource.deleteEvent(params);
  }
}
