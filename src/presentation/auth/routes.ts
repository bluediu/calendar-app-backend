import { Router } from 'express';

/* Middlewares */
import { check } from 'express-validator';
import { validateFields } from '../middlewares';

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

    router.post('/sign-in', (req, res) => {
      res.json({ ok: true });
    });

    return router;
  }
}
