import { json } from 'body-parser';
import express, { Express } from 'express';
import { Server } from 'http';
import { DatabaseController } from './db/mongoose';
import { UserController } from './users/user.controller';
import { loggerService } from './common/logger.service';

export class App {
	app: Express;
	server: Server;
	port: number;
	userController: UserController;
	databaseController: DatabaseController;

	constructor(userController: UserController, databaseController: DatabaseController) {
		this.app = express();
		this.port = 3000;
		this.userController = userController;
		this.databaseController = databaseController;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useMiddlewares(): void {
		console.log('use middlewares');
	}

	public async init(): Promise<void> {
		this.app.use(loggerService);
		this.app.use(json());
		this.useRoutes();
		this.databaseController.init();
		this.server = this.app.listen(this.port);
		console.log('Server is running on port ' + this.port);
	}

	public close(): void {
		this.server.close();
	}
}