import { Request } from 'express';
import { Document } from 'mongoose';

export interface IAuthRequest extends Request {
  auth?: {
    uid: string;
    name: string;
    role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';
  }
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  options: { name: string; values: string[] }[]
  variants?: IVariant[];
  price?: string;
  discountPrice?: string;
  inventory?: number;
  sku?: string;
  barcode?: string;
  vendor: { name: string };
  category: { name: string };
  status: 'ACTIVE' | 'DRAFT';
  images: string[];
  slug: string;
}

export interface IVariant {
  _id?: string;
  name: string;
  inventory: number;
  price: string;
  discountPrice: string;
  sku: string;
  barcode: string;
  images: string[];
}

export interface IOrder extends Document {
  number: string;
  items: {
    title: string;
    variant: { name: string };
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'DELIVERED' | 'PENDING' | 'CANCELLED';
  phoneNumber: string;
  customer: IUser;
  shippingAddress: {
    city: string;
    locality: string;
    address: string;
    apartment?: string;
    zip: string;
  }
}
