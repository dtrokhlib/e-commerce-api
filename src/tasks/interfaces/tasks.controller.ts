import { AuthController } from '../../common/auth.controller';
import { BaseController } from '../../common/base.controller';
import { IConfigService } from '../../config/interfaces/config.service.interface';
import { IUserService } from '../../users/interfaces/user.service.interface';
import { ITaskController } from './tasks.controller.interface';
import { NextFunction, Request, Response } from 'express';

export class TaskController extends BaseController implements ITaskController {
	userService: IUserService;
	configService: IConfigService;

	constructor(userService: IUserService, configService: IConfigService) {
		super();
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new AuthController(configService, userService)],
			},
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
		]);
		this.configService = configService;
		this.userService = userService;
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send('create');
	}
	async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send('update');
	}
	async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send('delete');
	}
}
