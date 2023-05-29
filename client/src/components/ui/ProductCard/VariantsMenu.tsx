import { useContext } from 'react';
import { ShoppingBagAdd } from 'iconoir-react';

import { CartContext } from '@/context';
import { IProduct, IProductCart } from '@/interfaces';

interface Props {
  product: IProduct;
  color: string;
}

export const VariantsMenu = ({ product, color }: Props) => {

  const { addToCart } = useContext(CartContext);

  const productCart: IProductCart = { 
    _id: product._id, 
    title: product.title, 
    featImageUrl: product.images[0], 
    fitType: product.fitType, 
    price: product.price, 
    discountPrice: product.discountPrice, 
    variant: product.variants[0], 
    quantity: 1, 
  };

  return (
    <div className='hidden lg:block opacity-0 lg:group-hover:opacity-100 absolute bottom-0 bg-[hsla(0,0%,100%,.75)] backdrop-blur-md w-[calc(100%-1.6rem)] ml-[0.8rem] mb-[0.8rem] p-3 rounded transition-opacity'>
      <p className='font-semibold text-center flex items-center justify-center gap-2 mb-3'>
        <ShoppingBagAdd width={ 16 } height={ 16 } />
        QUICK ADD
      </p>
      {
        product.variants.length !== 1
          ? (
            <div className='lg:flex flex-wrap gap-3 justify-center'>
              {
                product.variants.map(variant => {
                  if (variant.color === color) {
                    return (
                      <button 
                        key={ variant._id } 
                        className='bg-white w-8 h-8 rounded-md shadow-md hover:bg-black hover:text-white transition-colors'
                        onClick={ () => addToCart(productCart) }
                      >
                        { variant.size }  
                      </button>
                    );
                  }
                })
              }
            </div>
          )
          : (
            <button 
              className='bg-blue-600 text-white w-full py-2 rounded-md font-semibold'
              onClick={ () => addToCart(productCart) }
            >
              ADD TO BAG
            </button>
          )
      }
    </div>
  );
};
