/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { IEvent } from '../../../interfaces';

interface IListEventsUseCase {
  execute(): Promise<IEvent[]>;
}

export class ListEvents implements IListEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(): Promise<IEvent[]> {
    const events = await this.eventRepository.listEvents();
    return events;
  }
}
