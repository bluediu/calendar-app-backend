/* Config */
import { JwtAdapter } from '../../../config';

/* Dtos */
import { SignInUserDto } from '../../dtos';

/* Repositories */
import { AuthRepository } from '../../repositories';

/* Interfaces & types */
import { CustomError } from '../../errors';
import { TSignToken } from '../../../types';
import { IUserToken } from '../../../interfaces';

interface ISignInUseCase {
  execute(signInUserDto: SignInUserDto): Promise<IUserToken>;
}

export class SignInUser implements ISignInUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: TSignToken = JwtAdapter.generateToken
  ) {}

  async execute(signInUserDto: SignInUserDto): Promise<IUserToken> {
    const user = await this.authRepository.signIn(signInUserDto);
    const token = await this.signToken({ id: user.id });

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
