/* Domain */
import { UserEntity } from '../../domain/entities';
import { AuthDatasource } from '../../domain/datasources';
import { AuthRepository } from '../../domain/repositories';
import { LoginUserDto, SignInUserDto } from '../../domain/dtos';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }

  signIn(signInUserDto: SignInUserDto): Promise<UserEntity> {
    return this.authDatasource.signIn(signInUserDto);
  }
}
