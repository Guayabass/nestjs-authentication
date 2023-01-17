import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('I am the middleware being called!');

    const { authorization } = req.headers;//authorization es la variable o el nombre del header
    if (!authorization) {
      return res
        .status(403)
        .send({ error: 'No Authentication token provided!' });
    }
    if (authorization === '123') {
      next();
    } else {
        return res
        .status(403)
        .send({ error: 'Invalid Authentication token provided!' });
    }
  }
}
