export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static login(object: { [key: string]: any }): LoginUserDto {
    const { email, password } = object;
    return new LoginUserDto(email.toLowerCase(), password);
  }
}
