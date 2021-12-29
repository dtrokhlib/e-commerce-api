import { NextFunction, Request, Response } from 'express';

export interface ITaskController {
	view: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	viewAll: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
