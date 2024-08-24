import { UserEntity } from '../entities';

import { LoginUserDto, SignInUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract signIn(signInUserDto: SignInUserDto): Promise<UserEntity>;
}
