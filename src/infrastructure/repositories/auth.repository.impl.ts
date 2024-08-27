/* Domain */
import { AuthDatasource } from '../../domain/datasources';
import { AuthRepository } from '../../domain/repositories';
import { TokenEntity, UserEntity } from '../../domain/entities';
import { LoginUserDto, RenewTokenDto, SignInUserDto } from '../../domain/dtos';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }

  signIn(signInUserDto: SignInUserDto): Promise<UserEntity> {
    return this.authDatasource.signIn(signInUserDto);
  }

  renewToken(renewTokenDto: RenewTokenDto): Promise<TokenEntity> {
    return this.authDatasource.renewToken(renewTokenDto);
  }
}
