import { Request, Response } from 'express';

/* Domain */
import { LoginUserDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';
import { LoginUser } from '../../domain/use-cases/auth';
import { AuthRepository } from '../../domain/repositories';

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

    console.log('this.authRepository', this.authRepository);

    new LoginUser(this.authRepository)
      .execute(loginUserDto)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };
}
