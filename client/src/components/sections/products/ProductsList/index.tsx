import { useContext } from 'react';

import { TVariant } from '@/interfaces';
import { CatalogContext } from '@/context';

import { ProductCard } from '@/components/ui';
import { Skeleton } from './Skeleton';

export const ProductsList = () => {
  const { view, adaptedProducts, loadingProducts } = useContext(CatalogContext);

  return (
    <div className={ `grid ${ view === 'GRID' ? 'grid-cols-2' : 'grid-cols-1' } md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 gap-y-6 my-4 overflow-hidden mt-10` }>
      {
        loadingProducts
          ? new Array(10).fill(null).map((_val, i) => <Skeleton key={ i } /> ) 
          : (
            adaptedProducts.map(({ variantsToPrint, ...restOfProducts }) => {
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
      }
    </div>
  );
};
