import { Request } from 'express';
import { Document, SortOrder } from 'mongoose';
import QueryString from 'qs';

export interface IAuthRequest extends Request {
  auth?: {
    uid: string;
    name: string;
    role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';
  }
}

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';
  // eslint-disable-next-line no-unused-vars
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IProduct {
  _id: string;
  barcode?: string;
  category: ICategory;
  colors: string[];
  description: string;
  discountPrice?: number;
  images: string[];
  price: number;
  sizes: string[];
  sku?: string;
  slug: string;
  status: 'ACTIVE' | 'DRAFT';
  tags: string[];
  title: string;
  totalInventory: number;
  variants: any;
}

export interface IVariant {
  _id: string;
  name: string;
  images: string[];
  inventory: number;
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

export interface ICategory extends Document {
  name: string;
}

export interface IFilters {
  category?: string;
  color?: string;
  includeOutOfStock?: boolean;
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  status?: 'ACTIVE' | 'DRAFT';
  price?: {
    max: number;
    min: number;
  };
}

export interface IDataReq extends QueryString.ParsedQs {
  sortBy: string;
  orderBy: string;
  limit: string;
  page: string;
  filters: string;
  search: string;
}
