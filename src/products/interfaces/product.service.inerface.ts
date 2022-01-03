import { ObjectId } from 'mongodb';
import { IProductSchema } from './product.schema.interface';

export class IProductService {
	findOne: (productId: ObjectId) => Promise<IProductSchema | null>;
	find: (queryParams: any) => Promise<IProductSchema[] | null>;
	create: (data: any) => Promise<IProductSchema | null>;
	update: (productId: ObjectId, data: any) => Promise<IProductSchema | null>;
	delete: (productId: ObjectId) => Promise<IProductSchema | null>;
}
