import { IUserSchema } from './user.schema.interface';

export interface IUserService {
	find: (username: string, name: string) => Promise<IUserSchema | null>;
	create: (user: IUserSchema) => Promise<IUserSchema | null>;
	update: (user: IUserSchema) => Promise<IUserSchema>;
	delete: (user: IUserSchema) => Promise<boolean>;
}
