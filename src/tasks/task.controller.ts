import { AuthController } from '../common/auth.controller';
import { BaseController } from '../common/base.controller';
import { IConfigService } from '../config/interfaces/config.service.interface';
import { IUserService } from '../users/interfaces/user.service.interface';
import { ITaskController } from './interfaces/task.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { Guard } from '../common/guard.middleware';
import { ITaskService } from './interfaces/task.service.interface';
import { TaskModel } from './task.schema';
import { ITaskSchema } from './interfaces/task.schema.interface';

export class TaskController extends BaseController implements ITaskController {
	userService: IUserService;
	configService: IConfigService;
	taskService: ITaskService;

	constructor(userService: IUserService, configService: IConfigService, taskService: ITaskService) {
		super();
		this.bindRoutes([
			{
				path: '/view/all',
				method: 'get',
				func: this.viewAll,
				middlewares: [new Guard()],
			},
			{
				path: '/view/:id',
				method: 'get',
				func: this.view,
				middlewares: [new Guard()],
			},
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new Guard()],
			},
			{
				path: '/update/:id',
				method: 'put',
				func: this.update,
				middlewares: [new Guard()],
			},
			{
				path: '/delete/:id',
				method: 'delete',
				func: this.delete,
				middlewares: [new Guard()],
			},
		]);
		this.taskService = taskService;
		this.configService = configService;
		this.userService = userService;
	}

	async view(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		if (!req.params.id) {
			return res.status(400).send({ error: 'ID of task is not specified as parameter' });
		}
		const task = await this.taskService.find(req.params.id, req.user._id);
		if (!task) {
			return res.status(400).send({ error: 'Task ID is not matching existing one' });
		}
		return res.send(task);
	}

	async viewAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const allTasks = await this.taskService.findAll(req.user._id);
		res.send(allTasks);
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const taskData = new TaskModel({
			subject: req.body.subject,
			description: req.body.description,
			dueDate: req.body.dueDate,
			owner: req.user._id,
		});
		const task = await this.taskService.create(taskData);
		if (!task) {
			return res.status(500).send({ error: 'Internal server error' });
		}
		return res.send(task);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		if (!req.params.id) {
			return res.status(400).send({ error: 'ID of task is not specified as parameter' });
		}
		const currentTask = (await this.taskService.find(req.params.id, req.user._id)) as ITaskSchema;
		if (!currentTask) {
			return res.status(400).send({ error: 'Task ID is not matching existing one' });
		}
		const updatedTask = await this.taskService.update(currentTask, req.body);
		return res.send(updatedTask);
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		if (!req.params.id) {
			return res.status(400).send({ error: 'ID of task is not specified as parameter' });
		}
		const task = await this.taskService.delete(req.params.id, req.user._id);
		if (!task) {
			return res.status(400).send({ error: 'Failed to delete this task' });
		}
		return res.send(task);
	}
}
