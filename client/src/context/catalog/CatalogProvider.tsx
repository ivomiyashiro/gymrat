'use client';
import { FC, ReactNode, useEffect, useReducer } from 'react';

import { ICatalog } from '@/interfaces';

import { useProducts } from '@/hooks';
import { CatalogContext } from './CatalogContext';
import { catalogReducer } from './catelogReducer';

interface Props { children: ReactNode }

export const CATALOG_INIT_STATE: ICatalog = {
  filters: [],
  orderBy: 1,
  products: [],
  view: 'GRID',
  sortBy: 'TITLE',
  filterMenuOpen: false,
  loadingFilters: false,
}; 

export const CatalogProvider: FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(catalogReducer, CATALOG_INIT_STATE);
  const { products, loading: loadingProducts, pages } = useProducts({ 
    limit: 10, 
    sortBy: state.sortBy, 
    orderBy: state.orderBy,
  });

  // Load Products
  useEffect(() => {
    dispatch({
      type: '[CATALOG] - LOAD PRODUCTS',
      payload: {
        products
      }
    });

  }, [products]);

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
      loadingProducts,

      //Methods
      changeView,
      toggleFilterMenu
    } }>
      { children }
    </CatalogContext.Provider>
  );
};
