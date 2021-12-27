import { IUserSchema } from './interfaces/user.schema.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserModel } from './user.schema';

export class UserService implements IUserService {
	async find(email: string): Promise<null | IUserSchema> {
		try {
			const user = await UserModel.findOne({ email: email });
			if (!user) {
				return null;
			}
			return user;
		} catch (e) {
			return null;
		}
	}
	async create(user: IUserSchema): Promise<IUserSchema | null> {
		const newUser: IUserSchema = await UserModel.create(user);
		if (!newUser) {
			return null;
		}
		return newUser;
	}
	async update(user: IUserSchema): Promise<IUserSchema | null> {
		return null;
	}
	async delete(user: IUserSchema): Promise<boolean> {
		return true;
	}
}
