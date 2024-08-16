/* Domain */
import { LoginUserDto } from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';
import { AuthDatasource } from '../../domain/datasources';
import { AuthRepository } from '../../domain/repositories';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
}
