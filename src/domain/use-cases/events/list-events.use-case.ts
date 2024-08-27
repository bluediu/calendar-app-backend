/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { EventEntity } from '../../entities';

interface IListEventsUseCase {
  execute(): Promise<EventEntity[]>;
}

export class ListEvents implements IListEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(): Promise<EventEntity[]> {
    const events = await this.eventRepository.listEvents();
    return events;
  }
}
