'use client';
import { IProduct, TVariant } from '@/interfaces';
import { FadeUpContainer, ProductCard } from '@/components/ui';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

interface Props {
  products: IProduct[];
  limit: number;
  loading: boolean;
}

const ProductsCarrousel = ({ products, limit, loading }: Props) => {
  let printedItems = 0;
  
  return (
    <div className='flex gap-4 overflow-x-scroll scrollbar-hidden mt-6'>
      {
        loading
          ? ( new Array(4).fill(null).map((_val, i) => <ProductCardSkeleton key={ i } width='17rem' />) )
          : (
            <>
              {
                products.map(({ variantsToPrint, ...restOfProducts }) => {
                  return (
                    variantsToPrint?.map((variant: TVariant, i) => {
                      if (printedItems < limit){
                        printedItems++;

                        return (
                          <FadeUpContainer
                            key={ variant._id }
                            index={ printedItems }
                            delayFactor={ 100 }
                            className='flex flex-shrink-0 xl:flex-[1_1] w-[17rem]'
                          >
                            <ProductCard
                              product={ restOfProducts }
                              variant={ variant }
                              width='17rem'
                            /> 
                          </FadeUpContainer>
                        );
                      }
                    })
                  );
                })
              }
            </>
          )
      }
    </div>
  );
};

export default ProductsCarrousel;
