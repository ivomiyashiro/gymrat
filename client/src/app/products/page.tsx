'use client';
import { useState } from 'react';
import { Header, ProductsList } from '@/components/pages/products';

export default function Products() {

  const [view, setView] = useState(false);

  return (
    <main className='mt-[102px]'>
      <section className='px-4 py-12 lg:px-24 w-full max-w-[1640px] mx-auto'>
        <Header view={ view } handleView={ setView } />
        <ProductsList view={ view } />
      </section>
    </main>
  );
}
