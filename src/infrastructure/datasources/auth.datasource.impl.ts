/* Config */
import { BcryptAdapter } from '../../config';

/* Data */
import { UserModel } from '../../data/mongodb';

/* Domain */
import { CustomError } from '../../domain/errors';
import { UserEntity } from '../../domain/entities';
import { AuthDatasource } from '../../domain/datasources';
import { LoginUserDto, SignInUserDto } from '../../domain/dtos';

/* Mappers */
import { UserMapper } from '../mappers';

type THashFn = (password: string) => string;
type TCompareFn = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPw: THashFn = BcryptAdapter.hash,
    private readonly comparePw: TCompareFn = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    const msg = 'Email or password incorrect';
    try {
      // Check user existence.
      const user = await UserModel.findOne({ email });

      if (!user) throw CustomError.badRequest(msg);

      const passwordCorrect = this.comparePw(password, user.password);

      if (!passwordCorrect) throw CustomError.badRequest(msg);

      return UserMapper.userEntityFromObject(user);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async signIn(signInUserDto: SignInUserDto): Promise<UserEntity> {
    const { name, email, password } = signInUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPw(password),
      });
      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
