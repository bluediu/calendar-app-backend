import { UserEntity } from '../entities';

import { LoginUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract login(loginUseDto: LoginUserDto): Promise<UserEntity>;

  // abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  // abstract getUsers(): Promise<UserEntity[]>;
}
