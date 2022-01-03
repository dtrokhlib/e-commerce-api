import { query } from 'express';
import { ObjectId } from 'mongodb';
import { IProductSchema } from './interfaces/product.schema.interface';
import { IProductService } from './interfaces/product.service.inerface';
import { ProductModel } from './product.schema';

export class ProductService implements IProductService {
	async findOne(productId: ObjectId): Promise<IProductSchema | null> {
		try {
			const product = await ProductModel.findById(productId);
			return product;
		} catch (error) {
			return null;
		}
	}
	async find(queryParams: any): Promise<IProductSchema[] | null> {
		try {
			const { field, sort, limit, ...otherFilters } = queryParams;
			const regex: any = {};
			Object.keys(otherFilters).forEach((key) => {
				regex[key] = { $regex: `.*${otherFilters[key]}.*` };
			});
			const product = await ProductModel.find(regex);
			return product;
		} catch (error) {
			return null;
		}
	}
	async create(data: any): Promise<IProductSchema | null> {
		try {
			const product = new ProductModel(data);
			await product.save();
			return product;
		} catch (error) {
			return null;
		}
	}
	async update(productId: ObjectId, data: any): Promise<IProductSchema | null> {
		try {
			const product = await ProductModel.findByIdAndUpdate(productId, data);
			return product;
		} catch (error) {
			return null;
		}
	}
	async delete(productId: ObjectId): Promise<IProductSchema | null> {
		try {
			const product = await ProductModel.findByIdAndDelete(productId);
			return product;
		} catch (error) {
			return null;
		}
	}
}
