import { IUserSchema } from './user.schema.interface';

export interface IUserService {
	find: (email: string) => Promise<IUserSchema | null>;
	create: (user: IUserSchema) => Promise<IUserSchema | null>;
	update: (user: IUserSchema) => Promise<IUserSchema | null>;
	delete: (user: IUserSchema) => Promise<boolean>;
}
