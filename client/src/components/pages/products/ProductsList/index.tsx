
import { IProduct, TVariant } from '@/interfaces';
import { ProductCard } from '@/components/ui';

interface Props { 
  products: IProduct[];
  view: 'LIST' | 'GRID'; 
}

export const ProductsList = ({ products, view }: Props) => {

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
