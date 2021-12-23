import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from './users/users.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
	usersController: UsersController;

	constructor(usersController: UsersController) {
		this.app = express();
		this.port = 3000;
		this.usersController = usersController;
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	useMiddlewares(): void {
		console.log('use middlewares');
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		console.log('Server is running on port ' + this.port);
	}

	public close(): void {
		this.server.close();
	}
}
