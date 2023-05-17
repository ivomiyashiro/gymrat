import { model, Schema } from 'mongoose';
import { IVariant } from '../interfaces';

export const VariantScheme = new Schema<IVariant>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
  },
  discountPrice: {
    type: String,
  },
  sku: {
    type: String,
    default: null,
  },
  barcode: {
    type: String,
    default: null,
  },
  inventory: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: ['']
  }
}, { 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

export default model<IVariant>('Variant', VariantScheme);
