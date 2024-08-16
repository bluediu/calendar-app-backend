import { Router } from 'express';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // TODO: Implement datasource and repository

    router.post('/login', (req, res) => {
      res.json({ ok: true });
    });
    router.post('/sign-in', (req, res) => {
      res.json({ ok: true });
    });

    return router;
  }
}
