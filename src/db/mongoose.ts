import { connect } from 'mongoose';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/interfaces/config.service.interface';

export class DatabaseController {
	mongodb_url: string | undefined;

	constructor() {
		this.mongodb_url = new ConfigService().get('MONGODB_URL');
	}

	async init(): Promise<void> {
		if (this.mongodb_url) {
			await connect(this.mongodb_url, (err) => {
				console.log('Connected to DB', err || '[No Errors]');
			});
		} else {
			console.log('not able to connect', this.mongodb_url);
		}
	}
}
