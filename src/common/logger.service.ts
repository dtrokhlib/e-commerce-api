import winston from 'winston';
import expressWinston from 'express-winston';

export const loggerService = expressWinston.logger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.printf(
			(info) => `${info.timestamp} [${info.level}]: ${info.meta.req.headers.host} ${info.message}`,
		),
	),
	meta: true,
	msg: 'HTTP {{req.method}} {{req.url}}',
	expressFormat: true,
	colorize: true,
	ignoreRoute: function (req, res) {
		return false;
	},
});
