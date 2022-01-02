import { Model, Document } from 'mongoose';

export interface IProductSchema extends Document {
	product: {
		name: string;
		details: string;
		description: any;
		peculiarities: [peculiaritie: { name: string; description: string }];
		images: [{ image: { url: string; imageName: string } }];
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
