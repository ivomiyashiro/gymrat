'use client';
import Link from 'next/link';
import { TCategory } from '@/interfaces';
import { useProducts } from '@/hooks';
import { ProductsCarrousel } from '@/components/ui';

export const Recommendations = ({ category }: { category: TCategory }) => {
  const { adaptedProducts } = useProducts({ limit: 4, filters: [{ category }] });

  return (
    <section className='px-4 py-20 lg:px-24 w-full max-w-[1640px] mx-auto'>
      <h2 className='font-bold text-4xl'>YOU MAY LIKE</h2>
      <ProductsCarrousel products={ adaptedProducts } limit={ 4 } />
      <div className='flex w-full justify-end'>
        <Link href='/products' className='underline hover:text-blue-500 text-right mt-6'>
          View all
        </Link>
      </div>
    </section>
  );
};
