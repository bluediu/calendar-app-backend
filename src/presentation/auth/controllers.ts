import { Request, Response } from 'express';

/* Domain */
import { CustomError } from '../../domain/errors';
import { AuthRepository } from '../../domain/repositories';
import { LoginUserDto, SignInUserDto } from '../../domain/dtos';
import { LoginUser, SignInUser } from '../../domain/use-cases/auth';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  };

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
