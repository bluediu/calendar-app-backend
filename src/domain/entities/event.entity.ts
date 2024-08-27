interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export class EventEntity {
  constructor(
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: IUserResponse
  ) {}
}
