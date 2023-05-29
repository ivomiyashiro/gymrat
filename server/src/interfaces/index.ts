import { Request } from 'express';
import { Document, Schema } from 'mongoose';
import QueryString from 'qs';

type TRole = 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';

type TCategory = 'SHORTS' | 'SPORT BRAS' | 'HOODIES & JACKETS' | 'T-SHIRTS & TOPS' | 'TANK TOPS' | 'ACCESSORIES' | 'JOGGERS & SWEATPANTS';

type TFitType = 'REGULAR' | 'SLIM' | 'OVERSIZED';

type TGender = 'WOMEN' | 'MEN' | 'NOGEN';

type TProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

type TProductStatus = 'ACTIVE' | 'DRAFT';

type TOrderStatus = 'DELIVERED' | 'PENDING' | 'CANCELLED';

export type TVariant = {
  _id: string;
  color: string;
  images: string[];
  inventory: number;
  name: string;
  size: TProductSize;
  slug: string;
}

export interface IAuthRequest extends Request {
  auth?: {
    uid: string;
    name: string;
    role: TRole;
  }
}

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: TRole;
  // eslint-disable-next-line no-unused-vars
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IProduct {
  _id: string;
  barcode?: string;
  category: TCategory;
  colors: string[];
  description: string;
  discountPrice?: number;
  fitType: TFitType;
  gender: TGender;
  images: string[];
  price: number;
  sizes: string[];
  sku?: string;
  slug: string;
  status: TProductStatus;
  tags: string[];
  title: string;
  totalInventory: number;
  variants: TVariant[];
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
  status: TOrderStatus;
  customerInfo: {
    _id: typeof Schema.Types.ObjectId,
    name: string,
    email: string,
    phoneNumber: string;
  }
  shippingInfo: {
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

export interface IProductFilters {
  category?: string;
  color?: string;
  fitType?: TFitType;
  gender?: TGender;
  includeOutOfStock?: boolean;
  size?: TProductSize;
  status?: TProductStatus;
  price?: {
    max: number;
    min: number;
  };
}

export interface IOrderFilters {
  status?: TOrderStatus;
  totalPrice?: {
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
