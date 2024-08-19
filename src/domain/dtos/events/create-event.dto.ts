export class CreateEventDto {
  private constructor(
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: number
  ) {}

  static create(object: { [key: string]: any }): CreateEventDto {
    const { id, name, notes, start, end, user } = object;

    return new CreateEventDto(
      id,
      name.trim(),
      notes.name.trim(),
      start,
      end,
      user
    );
  }
}
