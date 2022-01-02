import { model, Schema } from 'mongoose';
import Profanity from 'profanity-js';
import {
	IProductSchema,
	IProductMethods,
	IProductStatic,
} from './interfaces/product.schema.interface';

// Profanity instance setup
const profanity = new Profanity();
const isProfanity = (value: string): void | Error => {
	if (profanity.isProfane(value)) {
		throw new Error('Fields should not contain any swear words');
	}
};

const ProductScheme = new Schema(
	{
		product: {
			name: {
				type: String,
				required: true,
				minlength: 2,
				maxlength: 200,
				validate(value: string): void | Error {
					isProfanity(value);
				},
			},
			details: {
				type: String,
				required: true,
				validate(value: string): void | Error {
					isProfanity(value);
				},
			},
			description: {
				type: String,
				required: true,
				validate(value: string): void | Error {
					isProfanity(value);
				},
			},
			peculiarities: [
				{
					peculiaritie: {
						name: {
							type: String,
							required: true,
							validate(value: string): void | Error {
								isProfanity(value);
							},
						},
						description: {
							type: String,
							required: true,
							validate(value: string): void | Error {
								isProfanity(value);
							},
						},
					},
				},
			],
			images: [
				{
					image: {
						url: String,
						imageName: String,
					},
				},
			],
		},
		price: {
			init: {
				type: Number,
				required: true,
			},
			current: {
				type: Number,
				required: true,
			},
			discount: {
				type: Number,
			},
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		manufacturer: {
			name: {
				type: String,
				required: true,
				validate(value: string): void | Error {
					isProfanity(value);
				},
			},
			country: {
				name: {
					type: String,
					required: false,
					validate(value: string): void | Error {
						isProfanity(value);
					},
				},
			},
			phone: {
				type: String,
				required: false,
				validate(value: string): void | Error {
					isProfanity(value);
				},
			},
			address: {
				type: String,
				required: false,
				validate(value: string): void | Error {
					isProfanity(value);
				},
			},
		},
		available: {
			type: Boolean,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true },
);

export const ProductModel = model<IProductSchema, IProductMethods, IProductStatic>(
	'Product',
	ProductScheme,
);
