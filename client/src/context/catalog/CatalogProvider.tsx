'use client';
import { FC, ReactNode, useState } from 'react';

import { useProducts } from '@/hooks';

import { useFiltersMenu } from './useFiltersMenu';
import { CatalogContext } from './CatalogContext';

interface Props { children: ReactNode }

export const CatalogProvider: FC<Props> = ({ children }) => {

  const [view, setView] = useState<'LIST' | 'GRID'>('GRID');
  const [menuOpen, setMenuOpen] = useState(false);

  const { 
    filters, 
    loading: loadingFilters, 
    sortingOptions, 
    checkedFilters, 
    toggleFilterCheckbox, 
    handleResetFilters,
    handleSortingChange
  } = useFiltersMenu();

  const { products, loading: loadingProducts } = useProducts({ 
    limit: 10,
    sortBy: sortingOptions.filter(sortVal => sortVal.checked)[0].sortBy,
    orderBy: sortingOptions.filter(sortVal => sortVal.checked)[0].orderBy,
  });

  const handleView = () => {
    if (view === 'GRID') {
      return setView('LIST');
    }

    setView('GRID');
  };

  const toggleFilterMenu = () => setMenuOpen(prev => !prev);

  return (
    <CatalogContext.Provider value={ {
      checkedFilters,
      filters,
      loadingFilters,
      loadingProducts,
      menuOpen,
      products,
      sortingOptions,
      view,

      //Methods
      handleResetFilters,
      handleSortingChange,
      handleView,
      toggleFilterCheckbox,
      toggleFilterMenu,
    } }>
      { children }
    </CatalogContext.Provider>
  );
};
