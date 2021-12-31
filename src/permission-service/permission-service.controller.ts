import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../common/interfaces/middleware.interface';

export class PermissionServiceController {
	roles: string[];

	constructor(roles: string[]) {
		this.roles = roles;
	}

	execute(req: Request, res: Response, next: NextFunction): Response | void {
		if (!this.roles.includes(req.user.role)) {
			return res.status(403).send({ error: 'Not authorized roles for this action' });
		}
		next();
	}
}
