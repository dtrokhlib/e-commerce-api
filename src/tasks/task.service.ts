import { IUserSchema } from '../users/interfaces/user.schema.interface';
import { ITaskSchema } from './interfaces/task.schema.interface';
import { ITaskService } from './interfaces/task.service.interface';
import { TaskModel } from './task.schema';
import { ObjectID } from 'bson';
import { ObjectId } from 'mongodb';

export class TaskService implements ITaskService {
	async find(taskId: string, userId: ObjectID): Promise<ITaskSchema | ITaskSchema[] | null> {
		const task = await TaskModel.findOne({ _id: new ObjectId(taskId), owner: userId });
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

	async delete(taskId: string, userId: ObjectID): Promise<ITaskSchema | null> {
		const task = await TaskModel.findOneAndDelete({ _id: new ObjectId(taskId), owner: userId });
		return task;
	}
}
