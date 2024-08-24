/* Dtos */
import { CreateEventDto } from '../../dtos';

/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { IEvent } from '../../../interfaces';

interface ICreateEventUseCase {
  execute(createEventDto: CreateEventDto): Promise<IEvent>;
}

export class CreateEvent implements ICreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(createEventDto: CreateEventDto): Promise<IEvent> {
    const event = await this.eventRepository.createEvent(createEventDto);

    return event;
  }
}
