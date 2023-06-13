'use client';
import { createContext } from 'react';
import { ICatalogSorting, IProduct, IProductFilters } from '@/interfaces';

export type SortKeys = 'TITLE' | 'PRICE' | 'BEST_SELLING'

interface ContextProps {
  adaptedProducts: IProduct[];
  checkedFilters: number;
  filters: IProductFilters[];
  loadingFilters: boolean;
  loadingProducts: boolean;
  menuOpen: boolean;
  products: IProduct[];
  view: 'LIST' | 'GRID';
  sortingOptions: ICatalogSorting[]

  //Methods
  handleResetFilters: () => void;
  handleSortingChange: (index: number) => void;
  handleView: () => void;
  toggleFilterCheckbox: (filterIndex: string, valueIndex: number) => void;
  toggleFilterMenu: () => void;
}

export const CatalogContext = createContext({} as ContextProps);
