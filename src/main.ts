import { App } from './app';
import { AuthController } from './common/auth.controller';
import { ConfigService } from './config/config.service';
import { DatabaseController } from './db/mongoose';
import { ProductController } from './products/product.controller';
import { ProductService } from './products/product.service';
import { TaskController } from './tasks/task.controller';
import { TaskService } from './tasks/task.service';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

async function bootstrap(): Promise<void> {
	const app = new App(
		new UserController(new UserService(), new ConfigService()),
		new TaskController(new UserService(), new ConfigService(), new TaskService()),
		new ProductController(new ProductService(), new ConfigService()),
		new AuthController(new UserService(), new ConfigService()),
		new DatabaseController(),
	);
	await app.init();
}

bootstrap();
