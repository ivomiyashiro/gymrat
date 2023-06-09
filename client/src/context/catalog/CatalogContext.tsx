'use client';
import { createContext } from 'react';
import { IProduct, IProductFilters } from '@/interfaces';

export type SortKeys = 'TITLE' | 'PRICE' | 'BEST_SELLING'

interface ContextProps {
  products: IProduct[];
  filters: IProductFilters[];
  filterMenuOpen: boolean;
  view: 'LIST' | 'GRID';
  checkedFilters: number;
  loadingProducts: boolean;
  loadingFilters: boolean;

  //Methods
  changeView: (value: 'LIST' | 'GRID') => void;
  toggleFilterMenu: () => void;
  toggleFilterCheckbox: (filterIndex: string, valueIndex: number) => void;
  resetFilters: () => void;
}

export const CatalogContext = createContext({} as ContextProps);
