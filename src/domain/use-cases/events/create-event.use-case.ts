/* Dtos */
import { CreateEventDto } from '../../dtos';

/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { EventEntity } from '../../entities';

interface ICreateEventUseCase {
  execute(createEventDto: CreateEventDto): Promise<EventEntity>;
}

export class CreateEvent implements ICreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(createEventDto: CreateEventDto): Promise<EventEntity> {
    const event = await this.eventRepository.createEvent(createEventDto);

    return event;
  }
}
