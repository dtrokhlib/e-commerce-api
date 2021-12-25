import { hash } from 'bcryptjs';
import { NextFunction } from 'express';
import mongoose, { model } from 'mongoose';
import validator from 'validator';
import { ConfigService } from '../config/config.service';
import { IUserSchema } from './interfaces/user.schema.interface';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			validate(value: string): void | Error {
				if (value.length < 7 || value.length > 45) {
					throw new Error('Username should be betweem 7 to 45 symbols');
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
			type: String,
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
	},
	{ timestamps: true },
);

const configService = new ConfigService();

userSchema.pre('save', async function (next): Promise<void> {
	const user = this;
	user.password = await hash(user.password, Number(configService.get('SALT')));
	next();
});

export const UserModel = model<IUserSchema>('User', userSchema);
