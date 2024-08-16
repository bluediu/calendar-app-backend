import { UserEntity } from '../entities';

import { LoginUserDto } from '../dtos';

export abstract class AuthDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  // abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  // abstract getUsers(): Promise<UserEntity[]>;
}
