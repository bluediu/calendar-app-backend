/* Config */
import { JwtAdapter } from '../../../config';

/* Dtos */
import { LoginUserDto } from '../../dtos';

/* Repositories */
import { AuthRepository } from '../../repositories';

/* Interfaces & types */
import { CustomError } from '../../errors';
import { TSignToken } from '../../../types';
import { IUserToken } from '../../../interfaces';

interface ILoginUseCase {
  execute(loginUserDto: LoginUserDto): Promise<IUserToken>;
}

export class LoginUser implements ILoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: TSignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<IUserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id, name: user.name });

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
