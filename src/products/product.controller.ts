import { NextFunction, Response, Request } from 'express';
import { IProductController } from './interfaces/product.controller.interface';

export class ProductController implements IProductController {
	async view(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send();
	}
	async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send();
	}
	async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send();
	}
	async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		return res.send();
	}
}
