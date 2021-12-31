import { Model, Document } from 'mongoose';
export interface IUserSchema extends Document {
	username: string;
	email: string;
	password?: string;
	age?: number;
	avatar?: Buffer;
	tokens?: Object[];
}

export interface IUserSchemaStatic extends Model<IUserSchema> {
	comparePasswords(
		email: string | undefined,
		username: string | undefined,
		password: string,
	): Promise<IUserSchema | null>;
	updateFields(fields: Object, user: IUserSchema): Promise<IUserSchema>;
}

export interface IUserSchemaMethod extends Model<IUserSchema, IUserSchemaStatic> {
	toJSON(): IUserSchema;
}
