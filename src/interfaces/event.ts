import { UpdateEventDto } from '../domain/dtos';

export interface IUpdateProps {
  id: string;
  token: string;
  event: UpdateEventDto;
}

export type IDeleteProps = Omit<IUpdateProps, 'event'>;
