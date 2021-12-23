import { Router } from 'express';
import { IRouteController } from './interfaces/route.interface';

export abstract class BaseController {
	private readonly _router: Router;

	constructor() {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	protected bindRoutes(routes: IRouteController[]): void {
		routes.forEach((route) => {
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
			console.log(`Route added: [${route.method}] ${route.path}`);
		});
	}
}
