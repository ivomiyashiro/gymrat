'use client';
import { ICatalog, IProductFilters } from '@/interfaces';

type productsActionType = 
  | { type: '[CATALOG] - CHANGE VIEW', payload: { view: 'LIST' | 'GRID'} }
  | { type: '[CATALOG] - TOGGLE FILTER MENU' }
  | { type: '[CATALOG] - UPDATE FILTERS', payload: { filters: IProductFilters[] } }
;

export const catalogReducer = (state: ICatalog, action: productsActionType): ICatalog => {

  switch (action.type) {

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

  case '[CATALOG] - UPDATE FILTERS':
    return {
      ...state,
      filters: action.payload.filters
    };

  default:
    return state;
  }
};
