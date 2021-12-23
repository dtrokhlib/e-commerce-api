import { App } from './app';
import { UsersController } from './users/users.controller';

async function bootstrap(): Promise<void> {
	const app = new App(new UsersController());
	await app.init();
}

bootstrap();
