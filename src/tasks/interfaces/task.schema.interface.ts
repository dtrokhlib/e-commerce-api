import { Model, Document, ObjectId } from 'mongoose';

export interface ITaskSchema extends Document {
	subject: string;
	description?: string;
	dueDate?: string;
	owner: ObjectId;
}
