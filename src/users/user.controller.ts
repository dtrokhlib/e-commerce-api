import { NextFunction, Request, Response } from 'express';
import { connect, model, Schema } from 'mongoose';
import { doc } from 'prettier';
import { BaseController } from '../common/base.controller';
import { IConfigService } from '../config/interfaces/config.service.interface';
import { IUserController } from './interfaces/user.controller.interface';
import { IUserSchema } from './interfaces/user.schema.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserModel } from './user.schema';
import { sign } from 'jsonwebtoken';
import { AuthController } from '../common/auth.controller';

export class UserController extends BaseController implements IUserController {
	userService: IUserService;
	configService: IConfigService;

	constructor(userService: IUserService, configService: IConfigService) {
		super();
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login, middlewares: [] },
			{ path: '/register', method: 'post', func: this.register, middlewares: [] },
			{
				path: '/update',
				method: 'put',
				func: this.update,
				middlewares: [new AuthController(configService, userService)],
			},
			{
				path: '/delete',
				method: 'delete',
				func: this.delete,
				middlewares: [new AuthController(configService, userService)],
			},
			{
				path: '/logout',
				method: 'post',
				func: this.logout,
				middlewares: [new AuthController(configService, userService)],
			},
			{
				path: '/logout/all',
				method: 'post',
				func: this.logoutAll,
				middlewares: [new AuthController(configService, userService)],
			},
		]);
		this.configService = configService;
		this.userService = userService;
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const user = await UserModel.comparePasswords(
				req.body.email,
				req.body.username,
				req.body.password,
			);
			if (!user) {
				return res.status(401).send('User credentials are not valid');
			}
			const token = await this.signJWT(user.email);
			user.tokens?.push({ token });
			await user.save();
			res.send({ user, token });
		} catch (e) {
			res.status(500).send('Internal server error. Please, try again later.');
		}
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const user = await this.userService.find(req.body.email);
			if (user) {
				return res.status(409).send({ error: 'The user already exist' });
			}
			const newUser = await this.userService.create(req.body);
			if (!newUser) {
				return res.status(500).send({ error: 'Internal server error. Please, try again later.' });
			}
			return res.status(201).send(newUser);
		} catch (e) {
			res.status(500).send(e);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		if (!req.user) {
			return res.status(400).send({ error: 'No user to update found' });
		}
		const updatedUser = await UserModel.updateFields(req.body, req.user);
		await updatedUser.save();
		res.send({ action: 'was updated', user: updatedUser });
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		if (!req.user) {
			return res.status(400).send({ error: 'No user to delete found' });
		}
		await req.user.delete();
		res.send({ action: 'was deleted', email: req.user.email });
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const token = req.headers.authorization?.split(' ')[1];
		const newTokens = req.user.tokens?.filter((item: any) => {
			return item.token !== token;
		});
		req.user.tokens = newTokens;
		await req.user.save();
		return res.send(req.user);
	}

	async logoutAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		req.user.tokens = [];
		await req.user.save();
		return res.send(req.user);
	}

	async signJWT(email: string): Promise<string> {
		const token = await sign({ email }, this.configService.get('SECRET'));
		return token;
	}
}
