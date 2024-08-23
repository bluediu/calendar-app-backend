import { Request, Response } from 'express';

/* Domain */
import { EventRepository } from '../../domain/repositories';
import { CreateEventDto, UpdateEventDto } from '../../domain/dtos';
import {
  CreateEvent,
  ListEvents,
  UpdateEvent,
} from '../../domain/use-cases/events';

/* Utils */
import { ErrorHandler } from '../../utils';

export class EventController extends ErrorHandler {
  constructor(private readonly eventRepository: EventRepository) {
    super();
  }

  listEvents = (_: Request, res: Response) => {
    new ListEvents(this.eventRepository)
      .execute()
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  createEvent = (req: Request, res: Response) => {
    const createEventDto = CreateEventDto.create(req.body);

    new CreateEvent(this.eventRepository)
      .execute(createEventDto)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  updateEvent = (req: Request, res: Response) => {
    const props = {
      id: req.params.uid,
      token: req.header('x-token')!,
      event: UpdateEventDto.update(req.body),
    };

    new UpdateEvent(this.eventRepository)
      .execute(props)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };
}
