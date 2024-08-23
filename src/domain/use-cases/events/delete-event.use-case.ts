/* Repositories */
import { EventRepository } from '../../repositories';

/* Interfaces */
import { IDeleteProps } from '../../../interfaces';

interface IDeleteEventUseCase {
  execute(props: IDeleteProps): Promise<void>;
}

export class DeleteEvent implements IDeleteEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(props: IDeleteProps): Promise<void> {
    await this.eventRepository.deleteEvent(props);
  }
}
