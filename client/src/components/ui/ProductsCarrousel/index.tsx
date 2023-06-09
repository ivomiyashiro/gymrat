'use client';
import { IProduct, TVariant } from '@/interfaces';
import { ProductCard } from '@/components/ui';

interface Props {
  products: IProduct[];
  limit: number;
}

const ProductsCarrousel = ({ products, limit }: Props) => {
  let printedItems = 0;
  
  return (
    <div className='flex gap-4 overflow-x-scroll scrollbar-hidden mt-6'>
      {
        products.map(({ variantsToPrint, ...restOfProducts }) => {
          return (
            variantsToPrint?.map((variant: TVariant) => {
              if (printedItems < limit){
                printedItems++;
                return (
                  <ProductCard
                    key={ variant._id } 
                    product={ restOfProducts }
                    variant={ variant }
                    width='17rem'
                  /> 
                );
              }
            })
          );
        })
      }
    </div>
  );
};

export default ProductsCarrousel;
