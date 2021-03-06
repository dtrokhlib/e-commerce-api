import { hash } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import { ConfigService } from '../config/config.service';
import {
	IUserSchema,
	IUserSchemaMethod,
	IUserSchemaStatic,
} from './interfaces/user.schema.interface';
import { compare } from 'bcryptjs';
import { TaskModel } from '../tasks/task.schema';

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			validate(value: string): void | Error {
				if (value.length < 7 || value.length > 45) {
					throw new Error('Username should be between 7 to 45 symbols');
				}
			},
		},
		email: {
			type: String,
			unique: true,
			required: true,
			validate(value: string): void | Error {
				if (!validator.isEmail(value)) {
					throw new Error('Email is not valid');
				}
			},
		},
		password: {
			type: String,
			required: true,
			validate(value: string): void | Error {
				if (!validator.isStrongPassword(value)) {
					throw new Error('Password is not secured enough');
				}
			},
		},
		age: {
			type: Number,
			required: false,
			validate(value: number): void | Error {
				if (value < 5 || value > 100) {
					throw new Error('Please set you real age');
				}
			},
		},
		avatar: {
			type: Buffer,
			required: false,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		role: {
			type: String,
			required: true,
			default: 'Editor',
		},
	},
	{ timestamps: true },
);

userSchema.statics.comparePasswords = async (
	email: string | undefined,
	username: string | undefined,
	password: string,
): Promise<IUserSchema | null> => {
	const user = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
	if (!user) {
		return null;
	}
	const isMatch = await compare(password, user.password as string);
	if (!isMatch) {
		return null;
	}
	return user;
};

userSchema.statics.updateFields = async (
	fields: Object,
	user: IUserSchema,
): Promise<IUserSchema> => {
	const fieldsKeys = Object.keys(fields);
	fieldsKeys.forEach((key) => {
		(user as any)[key] = (fields as any)[key];
	});

	return user;
};

userSchema.pre('save', async function (next): Promise<void> {
	const user = this;
	const configService = new ConfigService();
	if (user.isModified('password')) {
		user.password = await hash(user.password, Number(configService.get('SALT')));
	}

	next();
});

userSchema.pre('remove', async function (next): Promise<void> {
	const user = this;
	await TaskModel.deleteMany({ owner: user._id });
	next();
});

userSchema.methods.toJSON = function (): IUserSchema {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

export const UserModel: IUserSchemaStatic = model<
	IUserSchema,
	IUserSchemaStatic,
	IUserSchemaMethod
>('User', userSchema);
