'use client';
import { CatalogProvider } from '@/context';
import { Header, ProductsList, FiltersMenu } from '@/components/pages/products';

export default function Products() {
  return (
    <CatalogProvider>
      <main className='mt-[102px]'>
        <section className='px-4 py-12 lg:px-24 w-full max-w-[1640px] mx-auto'>
          <Header />
          <ProductsList />
          <FiltersMenu />
        </section>
      </main>
    </CatalogProvider>
  );
}
