import { App } from './app';
import { ConfigService } from './config/config.service';
import { DatabaseController } from './db/mongoose';
import { TaskController } from './tasks/interfaces/tasks.controller';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

async function bootstrap(): Promise<void> {
	const app = new App(
		new UserController(new UserService(), new ConfigService()),
		new TaskController(new UserService(), new ConfigService()),
		new DatabaseController(),
	);
	await app.init();
}

bootstrap();
