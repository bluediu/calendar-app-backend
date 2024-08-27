import { Router } from 'express';

/* Middlewares */
import { check } from 'express-validator';
import { TokenMiddleware, validateFields } from '../middlewares';

/* Infrastructure */
import { AuthDatasourceImpl } from '../../infrastructure/datasources';
import { AuthRepositoryImpl } from '../../infrastructure/repositories';

/* Controllers */
import { AuthController } from './controllers';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    router.post(
      '/login',
      [
        check('email', 'Invalid email format').isEmail(),
        check('password', 'Password cannot be empty').notEmpty(),
        validateFields,
      ],
      controller.loginUser
    );

    router.post(
      '/sign-in',
      [
        check('name', 'Name cannot be empty').notEmpty(),
        check('email', 'Invalid email format').isEmail(),
        check('password', 'Password cannot be empty').notEmpty(),
        validateFields,
      ],
      controller.signInUser
    );

    router.get(
      '/renew-token',
      TokenMiddleware.validateJwt,
      controller.renewToken
    );

    return router;
  }
}
