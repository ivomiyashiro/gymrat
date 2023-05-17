import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces';

const OrderScheme = new Schema<IOrder>({
  number: {
    type: String,
    unique: true,
    require: true
  },
  items: [{
    type: {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      title: String,
      variant: {
        name: String 
      },
      quantity: Number,
      price: Number,
      image: String,
    }
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  phoneNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['DELIVERED', 'PENDING', 'CANCELLED'],
    default: 'PENDING'
  },
  customer: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  shippingAddress: {
    type: {
      city: {
        type: String,
        required: true
      },
      locality: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true,
      },
      zip: {
        type: String,
        require: true,
      }
    },
    required: true
  }
}, { 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

export default model<IOrder>('Order', OrderScheme);
