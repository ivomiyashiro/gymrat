import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces';

const OrderScheme = new Schema<IOrder>({
  number: {
    type: String,
    unique: true,
    required: true
  },
  items: [{
    type: {
      product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product',
      },
      variant: { 
        type: Schema.Types.ObjectId
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
    required: true
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['DELIVERED', 'PENDING', 'CANCELLED'],
    default: 'PENDING'
  },
  customerInfo: {
    type: { 
      _id: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String
      },
      email: {
        type: String
      },
      phoneNumber: {
        type: String,
      }
    },
    required: true
  },
  shippingInfo: {
    type: {
      city: {
        type: String,
      },
      locality: {
        type: String,
      },
      address: {
        type: String,
      },
      zip: {
        type: String,
      }
    },
    required: true
  }
}, { 
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  versionKey: false
});

export default model<IOrder>('Order', OrderScheme);
