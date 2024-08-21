import { Response } from 'express';

/* Domain */
import { CustomError } from '../domain/errors';

export class ErrorHandler {
  handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  };
}
