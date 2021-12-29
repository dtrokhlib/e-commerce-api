import mongoose, { Schema, model } from 'mongoose';
import { ITaskSchema } from './interfaces/task.schema.interface';

const taskSchema = new Schema(
	{
		subject: {
			type: String,
			required: true,
			validate(value: string): void | Error {
				if (value.length < 2 || value.length > 100) {
					throw new Error('Subject should be between 2 to 100 symbols');
				}
			},
		},
		description: {
			type: String,
			required: false,
		},
		dueDate: {
			type: String,
			required: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

export const TaskModel = model<ITaskSchema>('Task', taskSchema);
