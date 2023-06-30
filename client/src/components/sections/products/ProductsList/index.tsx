import { useContext } from 'react';
import { TVariant } from '@/interfaces';
import { CatalogContext } from '@/context';
import { ProductCard, ProductCardSkeleton } from '@/components/ui';

export const ProductsList = () => {
  const { view, adaptedProducts, loadingProducts } = useContext(CatalogContext);

  return (
    <div className={ `grid ${ view === 'GRID' ? 'grid-cols-2' : 'grid-cols-1' } md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 gap-y-6 my-4 overflow-hidden mt-10` }>
      {
        loadingProducts
          ? new Array(10).fill(null).map((_val, i) => <ProductCardSkeleton key={ i } /> ) 
          : (
            adaptedProducts.length === 0
              ? (
                <div className='w-full mb-16 mt-4'>
                  <h3 className='font-semibold text-2xl text-gray-500'>Oops! We couldn&apos;t find any products...</h3>
                </div>
              )
              : (
                adaptedProducts.map(({ variantsToPrint, ...restOfProducts }) => {
                  if (adaptedProducts.length === 1 && variantsToPrint?.length === 0 ) {
                    return (
                      <div className='w-full mb-16 mt-4' key={ 0 }>
                        <h3 className='font-semibold text-2xl text-gray-500'>Oops! We couldn&apos;t find any products...</h3>
                      </div>
                    );
                  }

                  return (
                    variantsToPrint?.map((variant: TVariant) => {
                      return (
                        <ProductCard
                          key={ variant._id }
                          product={ restOfProducts }
                          variant={ variant }
                        />
                      );
                    })
                  );
                })
              )
          )
      }
    </div>
  );
};
