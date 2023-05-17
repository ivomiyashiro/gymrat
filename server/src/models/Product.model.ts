import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces';
import { Category, Vendor } from './';

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  options: {
    type: [{
      name: {
        type: String,
        require: true
      },
      values: {
        type: [String]
      }
    }],
    default: []
  },
  price: {
    type: String,
  },
  discountPrice: {
    type: String
  },
  inventory: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
  },
  barcode: {
    type: String,
  },
  variants: [{
    type: Schema.Types.ObjectId,
    ref: 'Variant'
  }],
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  status: {
    type: String,
    enum : ['ACTIVE', 'DRAFT'],
    default: 'ACTIVE'
  },
  images: {
    type: [String]
  },
  slug: {
    type: String
  }
}, { 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

export default model<IProduct>('Product', ProductSchema);
