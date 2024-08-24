import { Request, Response } from 'express';

/* Domain */
import { AuthRepository } from '../../domain/repositories';
import { LoginUserDto, SignInUserDto } from '../../domain/dtos';
import { LoginUser, SignInUser } from '../../domain/use-cases/auth';

/* Utils */
import { ErrorHandler } from '../../utils';

export class AuthController extends ErrorHandler {
  constructor(private readonly authRepository: AuthRepository) {
    super();
  }

  loginUser = (req: Request, res: Response) => {
    const loginUserDto = LoginUserDto.login(req.body);

    new LoginUser(this.authRepository)
      .execute(loginUserDto)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  signInUser = (req: Request, res: Response) => {
    const signInUserDto = SignInUserDto.create(req.body);

    new SignInUser(this.authRepository)
      .execute(signInUserDto)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };
}
