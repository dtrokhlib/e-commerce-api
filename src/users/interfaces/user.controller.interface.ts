import { NextFunction, Request, Response } from 'express';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	logout: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	logoutAll: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	uploadProfileImage: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
	signJWT: (id: string) => Promise<string>;
}
