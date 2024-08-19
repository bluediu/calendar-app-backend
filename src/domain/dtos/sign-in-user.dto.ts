export class SignInUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): SignInUserDto {
    const { name, email, password } = object;
    return new SignInUserDto(name, email.toLowerCase(), password);
  }
}
