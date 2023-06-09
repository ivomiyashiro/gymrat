'use client';
import { FC, ReactNode, useReducer } from 'react';

import { ICatalog } from '@/interfaces';

import { useProducts } from '@/hooks';

import { useFiltersMenu } from './useFiltersMenu';
import { CatalogContext } from './CatalogContext';
import { catalogReducer } from './catelogReducer';

interface Props { children: ReactNode }

export const CATALOG_INIT_STATE: ICatalog = {
  filters: [],
  products: [],
  orderBy: 1,
  view: 'GRID',
  sortBy: 'TITLE',
  filterMenuOpen: false,
}; 

export const CatalogProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(catalogReducer, CATALOG_INIT_STATE);
  const { filters, loading: loadingFilters, checkedFilters, toggleFilterCheckbox, resetFilters } = useFiltersMenu();
  const { products, loading: loadingProducts } = useProducts({ 
    limit: 10,
    sortBy: state.sortBy,
    orderBy: state.orderBy,
  });

  const changeView = (value: 'LIST' | 'GRID') => {
    dispatch({
      type: '[CATALOG] - CHANGE VIEW',
      payload: { view: value }
    });
  };

  const toggleFilterMenu = () => {
    dispatch({
      type: '[CATALOG] - TOGGLE FILTER MENU'
    });
  };

  return (
    <CatalogContext.Provider value={ {
      ...state,
      filters,
      products,
      checkedFilters,
      loadingProducts,
      loadingFilters,

      //Methods
      changeView,
      toggleFilterMenu,
      toggleFilterCheckbox,
      resetFilters
    } }>
      { children }
    </CatalogContext.Provider>
  );
};
