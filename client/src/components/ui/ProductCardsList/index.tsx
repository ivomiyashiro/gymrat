import { IProduct, TVariant } from '@/interfaces';
import { ProductCard } from '../ProductCard';

interface Props {
  products: IProduct[];
  max?: number;
}

export const ProductCardsList = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 my-4 overflow-hidden'>
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
