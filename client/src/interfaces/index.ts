
export type TRole = 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';

export type TCategory = 'SHORTS' | 'SPORT BRAS' | 'HOODIES & JACKETS' | 'T-SHIRTS & TOPS' | 'TANK TOPS' | 'ACCESSORIES' | 'JOGGERS & SWEATPANTS';

export type TFitType = 'REGULAR' | 'SLIM' | 'OVERSIZED';

export type TGender = 'WOMEN' | 'MEN' | 'NOGEN';

export type TProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type TProductStatus = 'ACTIVE' | 'DRAFT';

export type TOrderStatus = 'DELIVERED' | 'PENDING' | 'CANCELLED';

export type TVariant = {
  _id: string;
  color: string;
  images: string[];
  inventory: number;
  name: string;
  size: TProductSize;
  slug: string;
}

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  role: TRole;
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
  sizes: TProductSize[];
  sku?: string;
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
    _id: string,
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