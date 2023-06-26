
export type TRole = 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN';

export type TCategory = 'SHORTS' | 'SPORT BRAS' | 'HOODIES & JACKETS' | 'T-SHIRTS & TOPS' | 'TANK TOPS' | 'ACCESSORIES' | 'JOGGERS & SWEATPANTS';

export type TFitType = 'REGULAR' | 'SLIM' | 'OVERSIZED';

export type TGender = 'WOMEN' | 'MEN' | 'BOTH';

export type TProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'UNIQUE';

export type TProductStatus = 'ACTIVE' | 'DRAFT';

export type TOrderStatus = 'DELIVERED' | 'PENDING' | 'CANCELLED';

export type TToastType = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';

export type TOrderBy = 1 | -1 | undefined;

export type TSortBy = 'PRICE' | 'CREATEDAT'

export type TVariant = {
  _id: string;
  color: string;
  images: string[];
  inventory: number;
  name: string;
  size: TProductSize;
  slug: string;
}

export interface IUser {
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
  variantsToPrint?: TVariant[];
}

export interface IProductCart {
  _id: string;
  discountPrice?: number;
  fitType: TFitType;
  featImageUrl: string;
  quantity: number;
  price: number;
  title: string;
  variant: TVariant;
}

export interface IOrder {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductFilters {
  _id: string; 
  name: string, 
  values: { 
    _id: number; 
    value: string; 
    checked: boolean
  }[] 
}

export interface IProductPriceFilter {
  _id: string;
  name: string,
  values: {
    min?: string,
    max?: string
  }[]
}

export interface ICatalogSorting { 
  title: string; 
  orderBy: TOrderBy;
  sortBy: TSortBy;
  checked: boolean;
}

// Context interfaces

export interface ICartState { 
  cart: IProductCart[];
  orderPrice: number;
  orderDiscount: number;
  orderTotalPrice: number;
  totalProducts: number;
}

export interface IToast {
  visible: boolean;
  type: TToastType;
  title: string;
  content: string;
}

export interface ICatalog {
  filters: IProductFilters[];
  products: IProduct[];
  orderBy: 1 | -1;
  sortBy: 'TITLE' | 'PRICE';
  view: 'LIST' | 'GRID';
  filterMenuOpen: boolean;
}
