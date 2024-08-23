import { Router } from 'express';

/* Middlewares */
import { check } from 'express-validator';
import { TokenMiddleware, validateFields } from '../middlewares';

/* Infrastructure */
import { EventDatasourceImpl } from '../../infrastructure/datasources';
import { EventRepositoryImpl } from '../../infrastructure/repositories';

/* Controllers */
import { EventController } from './controllers';

export class EventRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new EventDatasourceImpl();
    const repository = new EventRepositoryImpl(datasource);
    const controller = new EventController(repository);

    router.get('/list', TokenMiddleware.validateJwt, controller.listEvents);
    router.post(
      '/create',
      [
        check('title', 'Title cannot be empty').notEmpty(),
        check('notes', 'Description cannot be empty').notEmpty(),
        check('start', 'Invalid start date format').isISO8601(),
        check('end', 'Invalid end date format').isISO8601(),
        check('user', 'Invalid end date format').notEmpty(),
        validateFields,
      ],
      controller.createEvent
    );
    router.put(
      '/update/:uid',
      [
        check('title', 'Title cannot be empty').notEmpty(),
        check('notes', 'Description cannot be empty').notEmpty(),
        check('start', 'Invalid start date format').isISO8601(),
        check('end', 'Invalid end date format').isISO8601(),
        validateFields,
      ],
      controller.updateEvent
    );

    return router;
  }
}
