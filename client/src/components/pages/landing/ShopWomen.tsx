'use client';
import Link from 'next/link';
import { useProducts } from '@/hooks';
import { ProductsCarrousel } from '@/components/ui';

export const ShopWomen = () => {

  const { products } = useProducts({ limit: 4, filters: [{ gender: 'WOMEN' }] });

  return (
    <section className='px-4 py-20 md:py-32 lg:px-24 w-full max-w-[1640px] mx-auto'>
      <h2 className='font-bold'>SHOP WOMEN</h2>
      <ProductsCarrousel products={ products } limit={ 4 } />
      <div className='flex w-full justify-end'>
        <Link href='/products' className='underline hover:text-blue-500 text-right mt-6'>
            View all
        </Link>
      </div>
    </section>
  );
};
