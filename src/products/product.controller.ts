import { NextFunction, Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import { BaseController } from '../common/base.controller';
import { Guard } from '../common/guard.middleware';
import { IConfigService } from '../config/interfaces/config.service.interface';
import { PermissionServiceController } from '../permission-service/permission-service.controller';
import { ITaskService } from '../tasks/interfaces/task.service.interface';
import { IUserService } from '../users/interfaces/user.service.interface';
import { IProductController } from './interfaces/product.controller.interface';
import { IProductService } from './interfaces/product.service.inerface';
import { ProductModel } from './product.schema';

export class ProductController extends BaseController implements IProductController {
	productService: IProductService;
	configService: IConfigService;

	constructor(productService: IProductService, configService: IConfigService) {
		super();
		this.bindRoutes([
			{
				path: '/view/:id',
				method: 'get',
				func: this.viewOne,
				middlewares: [],
			},
			{
				path: '/view',
				method: 'get',
				func: this.view,
				middlewares: [],
			},
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new Guard(), new PermissionServiceController(['Admin'])],
			},
			{
				path: '/update/:id',
				method: 'put',
				func: this.update,
				middlewares: [new Guard(), new PermissionServiceController(['Admin'])],
			},
			{
				path: '/delete/:id',
				method: 'delete',
				func: this.delete,
				middlewares: [new Guard(), new PermissionServiceController(['Admin'])],
			},
		]);
		this.productService = productService;
		this.configService = configService;
	}

	async viewOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const product = await this.productService.findOne(new ObjectId(req.params.id));
		if (!product) {
			return res
				.status(400)
				.send({ error: `Was not able to fetch product by id ${req.params.id}` });
		}
		return res.send(product);
	}

	async view(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const product = await this.productService.find(req.query);
		if (!product) {
			return res.status(400).send({ error: `Was not able to GET product by id ${req.params.id}` });
		}
		return res.send(product);
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const product = await this.productService.create(req.body);
		if (!product) {
			return res.status(400).send({ error: 'Validation failure.' });
		}
		return res.send(product);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const product = await this.productService.update(new ObjectId(req.params.id), req.body);
		if (!product) {
			return res
				.status(400)
				.send({ error: `Was not able to UPDATE product by id ${req.params.id}` });
		}
		return res.send(product);
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const product = await this.productService.delete(new ObjectId(req.params.id));
		if (!product) {
			return res
				.status(400)
				.send({ error: `Was not able to DELETE product by id ${req.params.id}` });
		}
		return res.send(product);
	}
}
