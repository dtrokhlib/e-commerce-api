import { DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

export interface IConfigService {
	config: DotenvParseOutput;
	get: (key: string) => string;
}
