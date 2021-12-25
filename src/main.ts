import { App } from './app';
import { ConfigService } from './config/config.service';
import { DatabaseController } from './db/mongoose';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

async function bootstrap(): Promise<void> {
	const app = new App(
		new UserController(new UserService(), new ConfigService()),
		new DatabaseController(),
	);
	await app.init();
}

bootstrap();
