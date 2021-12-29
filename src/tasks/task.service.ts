import { IUserSchema } from '../users/interfaces/user.schema.interface';
import { ITaskSchema } from './interfaces/task.schema.interface';
import { ITaskService } from './interfaces/task.service.interface';
import { TaskModel } from './task.schema';
import { ObjectID } from 'bson';

export class TaskService implements ITaskService {
	async find(_id: string | undefined): Promise<ITaskSchema | ITaskSchema[] | null> {
		const task = await TaskModel.findById(_id);
		if (!task) {
			return null;
		}
		return task;
	}

	async findAll(userId: ObjectID): Promise<ITaskSchema | ITaskSchema[] | null> {
		const allTasks = await TaskModel.find({ owner: userId });
		return allTasks;
	}

	async create(data: ITaskSchema): Promise<ITaskSchema> {
		await data.save();
		return data;
	}

	async update(task: ITaskSchema, fields: any[]): Promise<ITaskSchema> {
		const fieldsKeys = Object.keys(fields);
		fieldsKeys.forEach((key) => {
			(task as any)[key] = (fields as any)[key];
		});
		await task.save();
		return task;
	}

	async delete(_id: string): Promise<ITaskSchema | null> {
		const task = await TaskModel.findByIdAndDelete(_id);
		return task;
	}
}
