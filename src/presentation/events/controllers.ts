import { Request, Response } from 'express';

/* Domain */
import { EventRepository } from '../../domain/repositories';
import { CreateEventDto, UpdateEventDto } from '../../domain/dtos';
import {
  CreateEvent,
  DeleteEvent,
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
    const token = req.header('Authorization')!.split(' ').at(1)!;

    const props = {
      id: req.params.uid,
      token,
      event: UpdateEventDto.update(req.body),
    };

    new UpdateEvent(this.eventRepository)
      .execute(props)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  deleteEvent = (req: Request, res: Response) => {
    const token = req.header('Authorization')!.split(' ').at(1)!;

    const props = {
      id: req.params.uid,
      token,
    };

    new DeleteEvent(this.eventRepository)
      .execute(props)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };
}
