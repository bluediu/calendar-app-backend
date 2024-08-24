/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { IEvent, IUpdateProps } from '../../../interfaces';

interface IUpdateEventUseCase {
  execute(props: IUpdateProps): Promise<IEvent>;
}

export class UpdateEvent implements IUpdateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(props: IUpdateProps): Promise<IEvent> {
    const event = await this.eventRepository.updateEvent(props);

    return event;
  }
}
