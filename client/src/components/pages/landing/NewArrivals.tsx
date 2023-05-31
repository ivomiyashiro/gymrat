'use client';
import Link from 'next/link';
import { TVariant } from '@/interfaces';
import { useProducts } from '@/hooks';
import { ProductCard } from '@/components/ui';

export const NewArrivals = () => {

  const { products } = useProducts({ limit: 4 });

  return (
    <>
      <section className='px-4 py-20 md:py-32 lg:px-24 w-full max-w-[1640px] mx-auto'>
        <h2 className='font-bold'>NEW ARRIVALS</h2>
        <div className='flex gap-4 overflow-x-scroll scrollbar-hidden mt-6'>
          {
            products.map(({ variantsToPrint, ...restOfProducts }) => {
              return (
                variantsToPrint?.map((variant: TVariant) => {
                  return (
                    <ProductCard
                      key={ variant._id } 
                      product={ restOfProducts }
                      variant={ variant }
                      width='17rem'
                    /> 
                  );
                })
              );
            })
          }
          {
            products.map(({ variantsToPrint, ...restOfProducts }, i) => {
              if (i < 1)
                return (
                  variantsToPrint?.map((variant: TVariant) => {
                    return (
                      <ProductCard
                        key={ variant._id } 
                        product={ restOfProducts }
                        variant={ variant }
                        width='17rem'
                      /> 
                    );
                  })
                );
            })
            
          }
        </div>
        <div className='flex w-full justify-end'>
          <Link href='/products' className='underline hover:text-blue-500 text-right mt-6'>
            View all
          </Link>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `} 
      </style>
    </>

  );
};
