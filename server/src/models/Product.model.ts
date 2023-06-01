import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces';

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: { 
    type: Number,
    default: 0
  },
  colors: {
    type: [String],
    required: true,
  },
  gender: {
    type: String,
    enum: ['WOMEN', 'MEN', 'BOTH'],
    require: true
  },
  sizes: {
    type: [String]
  },
  discountPrice: {
    type: Number,
    default: null
  },
  totalInventory: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS'],
    required: true,
  },
  status: {
    type: String,
    enum : ['ACTIVE', 'DRAFT'],
    default: 'ACTIVE'
  },
  images: {
    type: [String]
  },
  tags: {
    type: [String],
    default: []
  },
  fitType: {
    type: String,
    enum: ['REGULAR', 'SLIM', 'OVERSIZED']
  },
  variants: {
    type: [{
      name: {
        type: String,
        required: true
      },
      color: {
        type: String
      },
      size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'UNIQUE']
      },
      inventory: {
        type: Number,
        default: 0
      },
      slug: {
        type: String,
        required: true
      },
      images: {
        type: [String],
        default: []
      }
    }],
    required: true
  }
}, { 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
});

export default model<IProduct>('Product', ProductSchema);
