import { Schema, model } from 'mongoose';
import { TVariant } from '../interfaces';

const VariantScheme = new Schema<TVariant>({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
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
}, { 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
});

export default model<TVariant>('Variant', VariantScheme);

