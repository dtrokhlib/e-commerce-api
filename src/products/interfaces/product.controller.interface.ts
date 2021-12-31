import { NextFunction, Response, Request } from 'express';

export interface IProductController {
	view: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
