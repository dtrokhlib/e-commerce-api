import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from '../common/base.controller';

export class UsersController extends BaseController {
	constructor() {
		super();
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login, middlewares: [] },
			{ path: '/register', method: 'post', func: this.register, middlewares: [] },
		]);
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.send('login route');
	}
	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.send('register route');
	}
}
