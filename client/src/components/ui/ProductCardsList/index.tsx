import { IProduct, TVariant } from '@/interfaces';
import { ProductCard } from '../ProductCard';

interface Props {
  products: IProduct[];
  max?: number;
}

export const ProductCardsList = ({ products, max }: Props) => {

  let productPrints = 0;

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 gap-y-6 my-4 overflow-hidden'>
      {
        products.map(({ variantsToPrint, ...restOfProducts }) => {
          if (max && productPrints < max) {
            return (
              variantsToPrint?.map((variant: TVariant, i: number) => {
                if (i < max) {
                  productPrints += 1;
                  return (
                    <ProductCard
                      key={ variant._id } 
                      product={ restOfProducts }
                      variant={ variant }
                      withMenu
                    /> 
                  );
                }
              })
            );
          } 
          else {
            return (
              variantsToPrint?.map((variant: TVariant) => {
                return (
                  <ProductCard
                    key={ variant._id } 
                    product={ restOfProducts }
                    variant={ variant }
                    withMenu
                  /> 
                );
              })
            );
          }
        })
      }
    </div>
  );
};
