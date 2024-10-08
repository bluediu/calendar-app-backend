import { TDynamicObject } from '../../../types';

export class CreateEventDto {
  private constructor(
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: string
  ) {}

  static create(object: TDynamicObject): CreateEventDto {
    const { id, title, notes, start, end, user } = object;

    return new CreateEventDto(id, title.trim(), notes.trim(), start, end, user);
  }
}
