import { IMiddleware } from './interfaces/middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class Guard implements IMiddleware {
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		next();
	}
}
