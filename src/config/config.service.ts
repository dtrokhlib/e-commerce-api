import { DotenvConfigOutput } from 'dotenv';
import { IConfigService } from './interfaces/config.service.interface';
import { config, DotenvParseOutput } from 'dotenv';

export class ConfigService implements IConfigService {
	config: DotenvParseOutput;

	constructor() {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			console.log(result.error);
		} else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
