import mongoose, { ObjectId } from 'mongoose';

export interface IUserSchema {
	username: string;
	email: string;
	password?: string;
	age?: number;
	avatar?: string;
	tokens?: string[];
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	_id?: ObjectId;
}
