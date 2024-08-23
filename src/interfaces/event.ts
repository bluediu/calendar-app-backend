import { UpdateEventDto } from '../domain/dtos';

export interface IEvent {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: string;
}

export interface IUpdateProps {
  id: string;
  token: string;
  event: UpdateEventDto;
}
