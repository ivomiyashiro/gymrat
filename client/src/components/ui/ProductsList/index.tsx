import { IProduct } from '@/interfaces';
import { ProductCard } from '../ProductCard';

interface Props {
  products: IProduct[];
  max?: number;
}

export const ProductsList = ({ products, max }: Props) => {

  let productPrints = 0;

  return (
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 gap-y-6 my-4 overflow-hidden'>
      {
        products.map(({ title, discountPrice, fitType, price, variants }) => {
          if (max && productPrints < max) {
            return (
              variants.map(({ _id, color, images, slug }, i) => {
                if (i < 6) {
                  productPrints += 1;
                  return (
                    <ProductCard
                      key={ _id } 
                      title={ title }
                      discountPrice={ discountPrice }
                      featImageUrl={ images[0] }
                      fitType={ fitType }
                      price={ price }
                      color={ color }
                      slug={ slug }
                    /> 
                  );
                }
              })
            );
          } 
          else {
            return (
              variants.map(({ _id, color, images, slug }) => {
                return (
                  <ProductCard
                    key={ _id } 
                    title={ title }
                    discountPrice={ discountPrice }
                    featImageUrl={ images[0] }
                    fitType={ fitType }
                    price={ price }
                    color={ color }
                    slug={ slug }
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
