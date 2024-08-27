import express, { Router } from 'express';
import cors from 'cors';

interface IOptions {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: IOptions) {
    const { port = 8080, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Use defined routes.
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`*/** 🚀 Listening in port ${this.port} **/`);
    });
  }
}
