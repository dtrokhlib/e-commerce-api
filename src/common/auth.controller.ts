import { IMiddleware } from './interfaces/middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IConfigService } from '../config/interfaces/config.service.interface';
import { IUserService } from '../users/interfaces/user.service.interface';

export class AuthController implements IMiddleware {
	configSerive: IConfigService;
	userService: IUserService;

	constructor(userService: IUserService, configService: IConfigService) {
		this.configSerive = configService;
		this.userService = userService;
	}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const token = req.headers.authorization?.split(' ')[1];
			if (!token) {
				return next();
			}
			const userEmail = await verify(token, this.configSerive.get('SECRET'));
			if (!userEmail) {
				return next();
			}
			const user = await this.userService.find((<any>userEmail).email);
			if (!user) {
				return next();
			}
			const isTokenValid = user.tokens?.some((item: any) => {
				return item.token == token;
			});
			if (!isTokenValid) {
				return next();
			}
			req.user = user;
			next();
		} catch (e) {
			res.status(403).send({ message: 'Unauthorized for this action', error: e });
		}
	}
}
