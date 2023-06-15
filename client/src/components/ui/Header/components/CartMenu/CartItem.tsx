import { ChangeEvent, useContext, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash } from 'iconoir-react';

import { IProductCart, TVariant } from '@/interfaces';
import { CartContext } from '@/context';

interface Props { 
  product: IProductCart; 
  variant: TVariant;
  handleCloseModal: () => void;
}

export const CartItem = ({ product, variant, handleCloseModal }: Props) => {

  const { removeFromCart, updateProductQuantity } = useContext(CartContext);
  const id = useId();

  return (
    <article className='flex relative w-full overflow-visible'>
      <div className='relative block w-[8rem] max-h-[10rem] min-h-[10rem] lg:w-[10rem] lg:max-h-[12.5rem] lg:min-h-[12.5rem] mr-4'>
        <Link href={ `/products/${ variant.slug }` } className='block' onClick={ handleCloseModal }>
          <Image 
            src={ product.featImageUrl }
            alt={ product.title }
            sizes='(min-width: 768px) 12.4rem, 10rem'
            fill
          />
        </Link>
      </div>
      <div className='flex-[1_1] flex flex-col gap-1 w-full'>
        <Link href={ `/products/${ variant.slug }` } onClick={ handleCloseModal }>
          <p>{ product.title }</p>
        </Link>
        <p className='text-gray-500 text-sm'>
          { product.fitType && (product.fitType.charAt(0).toUpperCase() + product.fitType.slice(1).toLowerCase())}  
        </p>
        <p className='text-gray-500 text-sm'>
          { variant.color } 
          { variant.size !== 'UNIQUE' && ' | ' + variant.size }
        </p>
        <p className='font-semibold'>${ product.price }</p>
        <div className='mt-auto flex justify-between items-center'>
          <button 
            className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 shadow hover:scale-95 transition' 
            onClick={ () => removeFromCart(product.variant._id) }
          >
            <Trash width={ 18 } height={ 18 }/>
          </button>
          <div>
            <label htmlFor={ id } className='font-semibold'>Quantity: </label>
            <select 
              id={ id }
              name='product-cart-quantity'
              className='outline-none'
              value={ product.quantity }
              onChange={ (e: ChangeEvent<HTMLSelectElement>) => updateProductQuantity({ ...product, quantity: Number(e.target.value) }) }
            >
              { [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10].map(quantity => (
                <option key={ quantity } value={ quantity }>{ quantity }</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </article>
  );
};
