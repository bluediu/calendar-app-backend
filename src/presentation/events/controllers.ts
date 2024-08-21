import { Request, Response } from 'express';

/* Domain */
import { CreateEventDto } from '../../domain/dtos';
import { EventRepository } from '../../domain/repositories';

export class EventController {
  constructor(private readonly eventRepository: EventRepository) {}

  createEvent = (req: Request, res: Response) => {
    const createEventDto = CreateEventDto.create(req.body);

    // TODO: Use-case
    res.json({ ok: true });
  };
}
