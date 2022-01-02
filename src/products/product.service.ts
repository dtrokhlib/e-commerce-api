import { ObjectId } from 'mongodb';
import { IProductSchema } from './interfaces/product.schema.interface';
import { IProductService } from './interfaces/product.service.inerface';
import { ProductModel } from './product.schema';

export class ProductService implements IProductService {
	async findOne(productId: ObjectId): Promise<IProductSchema | null> {
		return null;
	}
	async find(queryParams: string): Promise<IProductSchema[] | null> {
		return null;
	}
	async create(data: any): Promise<IProductSchema | null> {
		const product = new ProductModel(data);
		await product.save();
		return product;
	}
	async update(productId: ObjectId, fields: any): Promise<IProductSchema | null> {
		return null;
	}
	async delete(productId: ObjectId): Promise<IProductSchema | null> {
		return null;
	}
}
