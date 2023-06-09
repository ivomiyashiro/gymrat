'use client';
import { useContext } from 'react';
import { CatalogContext } from '@/context';
import { Header, ProductsList, FiltersMenu } from '@/components/pages/products';

export default function Products() {
  const { products, view, checkedFilters, toggleFilterMenu, changeView, } = useContext(CatalogContext);

  return (
    <main className='mt-[102px]'>
      <section className='px-4 py-12 lg:px-24 w-full max-w-[1640px] mx-auto'>
        <Header view={ view } checkedFiltersLength={ checkedFilters } handleView={ changeView } handleToggleMenu={ toggleFilterMenu } />
        <ProductsList products={ products } view={ view } />
        <FiltersMenu />
      </section>
    </main>
  );
}
