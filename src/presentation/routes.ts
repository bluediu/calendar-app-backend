import { Router } from 'express';

import { AuthRoutes } from './auth';
import { EventRoutes } from './events';

// https://github.com/AungMyoKyaw/redoc-express#readme
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Define main routes
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/events', EventRoutes.routes);

    return router;
  }
}
