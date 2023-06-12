import { useContext } from 'react';
import { TVariant } from '@/interfaces';
import { CatalogContext } from '@/context';
import { ProductCard } from '@/components/ui';

export const ProductsList = () => {
  const { view, products } = useContext(CatalogContext);

  return (
    <div className={ `grid ${ view === 'GRID' ? 'grid-cols-2' : 'grid-cols-1' } md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 gap-y-6 my-4 overflow-hidden mt-10` }>
      {
        products.map(({ variantsToPrint, ...restOfProducts }) => {
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
      }
    </div>
  );
};
