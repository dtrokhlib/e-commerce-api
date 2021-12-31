import { IMiddleware } from '../common/interfaces/middleware.interface';
import multer, { Multer } from 'multer';
import { Request, Response, NextFunction } from 'express';

export class FileUploadMiddleware implements IMiddleware {
	upload: Multer;

	constructor() {
		this.upload = multer({
			limits: {
				fileSize: 1000000,
			},
			fileFilter(req, file, cb) {
				if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
					return cb(
						new Error(
							'File type must be one of the following: .PNG, .JPG, .JPEG and under 1MB in size',
						),
					);
				}
				console.log('fileFilter');
				cb(null, true);
			},
		});
	}

	execute(req: Request, res: Response, next: NextFunction): any {
		this.upload.single('upload')(req, res, () => {
			next();
		});
	}
}
