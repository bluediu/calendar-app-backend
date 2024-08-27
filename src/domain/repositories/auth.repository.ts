import { TokenEntity, UserEntity } from '../entities';

import { LoginUserDto, RenewTokenDto, SignInUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract signIn(signInUserDto: SignInUserDto): Promise<UserEntity>;

  abstract renewToken(renewTokenDto: RenewTokenDto): Promise<TokenEntity>;
}
