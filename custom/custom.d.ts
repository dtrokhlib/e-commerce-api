import { IUserSchema } from './interfaces/user.schema.interface';

declare global {
	namespace Express {
		interface Request {
			user: IUserSchema;
		}
	}
}
