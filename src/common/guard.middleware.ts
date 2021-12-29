import { IMiddleware } from './interfaces/middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class Guard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		res.status(401).send({ error: 'Not authorized' });
	}
}
