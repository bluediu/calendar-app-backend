/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { IUpdateProps } from '../../../interfaces';
import { EventEntity } from '../../entities';

interface IUpdateEventUseCase {
  execute(props: IUpdateProps): Promise<EventEntity>;
}

export class UpdateEvent implements IUpdateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(props: IUpdateProps): Promise<EventEntity> {
    const event = await this.eventRepository.updateEvent(props);

    return event;
  }
}
