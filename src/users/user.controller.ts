import { NextFunction, Request, Response, Router } from 'express';
import { connect, model, Schema } from 'mongoose';
import { doc } from 'prettier';
import { BaseController } from '../common/base.controller';
import { IConfigService } from '../config/interfaces/config.service.interface';
import { IUserController } from './interfaces/user.controller.interface';
import { IUserSchema } from './interfaces/user.schema.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserModel } from './user.schema';

export class UserController extends BaseController implements IUserController {
	userService: IUserService;
	configService: IConfigService;

	constructor(userService: IUserService, configService: IConfigService) {
		super();
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login, middlewares: [] },
			{ path: '/register', method: 'post', func: this.register, middlewares: [] },
			{ path: '/update', method: 'put', func: this.update, middlewares: [] },
			{ path: '/delete', method: 'delete', func: this.delete, middlewares: [] },
		]);
		this.configService = configService;
		this.userService = userService;
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const user = await this.userService.find(req.body.username, req.body.email);
			if (!user) {
				res.status(401).send('User credentials are not valid');
			} else {
				res.send(user);
			}
		} catch (e) {
			res.status(500).send('Internal server error. Please, try again later.');
		}
	}
	async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const user = await this.userService.find(req.body.username, req.body.email);
			if (user) {
				return res
					.status(409)
					.send({ error: 'The user with same username or email already exist' });
			}
			const newUser = await this.userService.create(req.body);
			if (!newUser) {
				res.status(500).send({ error: 'Internal server error. Please, try again later.' });
			}
			return res.status(201).send(newUser);
		} catch (e) {
			res.status(403).send(e);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.send();
	}
	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.send();
	}
	async signJWT(id: string) {
		return 'token';
	}
}
