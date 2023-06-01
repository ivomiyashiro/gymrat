import { IProduct, TVariant } from '@/interfaces';
import { ProductCard } from '@/components/ui/ProductCard';

interface Props {
  products: IProduct[];
  max?: number;
}

export const SearchedProductsList = ({ products }: Props) => {
  let printedItems = 0;
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 my-4 overflow-hidden'>
      {
        products.map(({ variantsToPrint, ...restOfProducts }) => {
          return (
            variantsToPrint?.map((variant: TVariant) => {
              if (printedItems < 4) {
                printedItems++;
                return (
                  <ProductCard
                    key={ variant._id } 
                    product={ restOfProducts }
                    variant={ variant }
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
