import { useContext } from 'react';
import { ShoppingBagAdd } from 'iconoir-react';

import { IProduct, TProductSize, TVariant } from '@/interfaces';
import { CartContext } from '@/context';

interface Props {
  product: IProduct;
  variant: TVariant;
}

export const QuickAddMenu = ({ product, variant }: Props) => {

  const { addToCart } = useContext(CartContext);
  const { color } = variant;

  const handleAddProduct = (color: string, size: TProductSize) => {
    addToCart({ 
      _id: product._id, 
      discountPrice: product.discountPrice, 
      featImageUrl: variant.images[0], 
      fitType: product.fitType, 
      price: product.price, 
      quantity: 1, 
      title: product.title, 
      variant: product.variants.filter(vari => (vari.color === color) && (vari.size === size))[0]
    });
  };

  return (
    <div className='hidden lg:block opacity-0 lg:group-hover:opacity-100 absolute bottom-0 bg-[hsla(0,0%,100%,.75)] backdrop-blur-md w-[calc(100%-1.6rem)] ml-[0.8rem] mb-[0.8rem] p-3 rounded transition-opacity'>
      <p className='font-semibold text-center flex items-center justify-center gap-2 mb-3'>
        <ShoppingBagAdd width={ 16 } height={ 16 } />
        QUICK ADD
      </p>
      { product.variants.length !== 1
        ? (
          <div className='lg:flex flex-wrap gap-3 justify-center'>
            {
              product.variants.map(vari => {
                if (vari.color === color) {
                  return (
                    <button
                      key={ vari._id } 
                      className={ `relative bg-white w-10 h-8 rounded-md shadow-md transition-colors ${ vari.inventory <= 0 ? '!bg-gray-200 before:content-[""] before:w-full before:h-[1px] before:bg-gray-500 before:absolute before:left-0 before:top-4 before:rotate-45 text-gray-500' : 'hover:bg-black hover:text-white' }` }
                      onClick={ () => handleAddProduct(vari.color, vari.size) }
                      disabled={ vari.inventory <= 0 }
                    >
                      { vari.size }
                    </button>
                  );
                }
              })
            }
          </div>
        )
        : (
          <button 
            className='bg-blue-600 text-white w-full py-2 rounded-md font-semibold transition hover:scale-95'
            onClick={ () => handleAddProduct(variant.color, variant.size) }
          >
            ADD TO BAG
          </button>
        ) }
    </div>
  );
};
