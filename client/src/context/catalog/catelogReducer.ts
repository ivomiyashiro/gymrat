'use client';
import { IProduct, ICatalog } from '@/interfaces';

type productsActionType = 
  | { type: '[CATALOG] - LOAD PRODUCTS', payload: { products: IProduct[] } }
  | { type: '[CATALOG] - CHANGE VIEW', payload: { view: 'LIST' | 'GRID'} }
  | { type: '[CATALOG] - TOGGLE FILTER MENU' }
;

export const catalogReducer = (state: ICatalog, action: productsActionType): ICatalog => {

  switch (action.type) {

  case '[CATALOG] - LOAD PRODUCTS':
    return {
      ...state,
      products: action.payload.products
    };

  case '[CATALOG] - CHANGE VIEW':
    return {
      ...state,
      view: action.payload.view
    };

  case '[CATALOG] - TOGGLE FILTER MENU':
    return {
      ...state,
      filterMenuOpen: !state.filterMenuOpen
    };

  default:
    return state;
  }
};
