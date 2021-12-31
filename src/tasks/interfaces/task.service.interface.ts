import { IUserSchema } from '../../users/interfaces/user.schema.interface';
import { ITaskSchema } from './task.schema.interface';
import { ObjectID } from 'bson';

export class ITaskService {
	find: (taskId: string, userId: ObjectID) => Promise<ITaskSchema[] | ITaskSchema | null>;
	findAll: (userId: ObjectID) => Promise<ITaskSchema[] | ITaskSchema | null>;
	create: (data: ITaskSchema) => Promise<ITaskSchema>;
	update: (task: ITaskSchema, fields: any[]) => Promise<ITaskSchema>;
	delete: (taskId: string, userId: ObjectID) => Promise<ITaskSchema | null>;
}
