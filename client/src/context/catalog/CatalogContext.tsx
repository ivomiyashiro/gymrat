'use client';
import { createContext } from 'react';
import { IProduct } from '@/interfaces';

export type SortKeys = 'TITLE' | 'PRICE' | 'BEST_SELLING'

interface ContextProps {
  products: IProduct[];
  filters: any[];
  filterMenuOpen: boolean;
  view: 'LIST' | 'GRID';
  loadingProducts: boolean;
  loadingFilters: boolean;

  //Methods
  changeView: (value: 'LIST' | 'GRID') => void;
  toggleFilterMenu: () => void;
}

export const CatalogContext = createContext({} as ContextProps);
