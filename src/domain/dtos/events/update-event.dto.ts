import { TDynamicObject } from '../../../types';

export class UpdateEventDto {
  private constructor(
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: string
  ) {}

  static update(object: TDynamicObject): UpdateEventDto {
    const { id, title, notes, start, end, user } = object;

    return new UpdateEventDto(id, title.trim(), notes.trim(), start, end, user);
  }
}
