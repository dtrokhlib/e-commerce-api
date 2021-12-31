import { Model } from 'mongoose';

export interface IProductSchema {
	product: {
		name: string;
		details: string;
		images: string[];
		description: any;
		peculiarities: string[];
	};
	price: {
		init: number;
		current: number;
		discount: number;
	};
	starDate: Date;
	endDate: Date;
	manufacturer: {
		name: string;
		country: string;
		phone: string;
		address: string;
	};
	available: Boolean;
	quantity: number;
	rating: number;
}

export interface IProductMethods extends Model<IProductSchema> {
	test: () => void;
}

export interface IProductStatic extends Model<IProductSchema, IProductMethods> {
	test2: () => void;
}
