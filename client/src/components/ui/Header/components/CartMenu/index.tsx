import { Dispatch, SetStateAction, useContext } from 'react';
import Link from 'next/link';
import { Cancel } from 'iconoir-react';

import { CartContext } from '@/context';

import { Modal } from '@/components/ui/Modal';
import { CartItem } from './CartItem';

interface Props {
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartMenu = ({ open, handleOpen }: Props) => {
  const { cart, totalProducts, orderDiscount, orderPrice, orderTotalPrice } = useContext(CartContext);

  return (
    <Modal open={ open } onClose={ () => handleOpen(false) } withBackground>
      <aside className={ `fixed top-0 w-full lg:w-[470px] right-0 h-screen bg-white z-50 transition-all overflow-hidden ${ open ? 'translate-x-0' : 'translate-x-[100%]' }` }>
        <div className='flex flex-col h-full relative'>
          <div className='p-4 shadow flex items-center justify-between'>
            <h2 className='font-bold text-3xl'>YOUR BAG</h2>
            <button aria-label='Close' className='h-9 w-9 rounded-md flex items-center justify-center' onClick={ () => handleOpen(false) }>
              <Cancel width={ 28 } height={ 28 } strokeWidth={ 1.7 } />
            </button>
          </div>
          {
            cart.length > 0
              ? (
                <div className='p-4 h-full flex flex-col'>
                  <div className=' flex flex-col max-h-[530px] pb-6 gap-4 overflow-y-auto scrollbar-hidden'>
                    { cart.map(product => (
                      <CartItem 
                        key={ product.variant._id } 
                        product={ product } 
                        variant={ product.variant } 
                        handleCloseModal={ () => handleOpen(false) }
                      />
                    )) }
                  </div>
                  <div className='px-4 py-6 border-t flex flex-col gap-4 w-full mt-auto'>
                    <div className='flex justify-between'>
                      <p className='font-semibold'>{ totalProducts } PRODUCTS</p>
                      <p className='font-semibold'>${ orderPrice }</p>
                    </div>
                    {
                      orderDiscount !== 0
                      &&
                      <div className='flex justify-between'>
                        <p className='font-semibold'>DISCOUNT</p>
                        <p className='font-semibold'>- $ { orderDiscount }</p>
                      </div>
                    }
                    <div className='flex justify-between'>
                      <p className='font-semibold'>TOTAL</p>
                      <p className='font-semibold'>${ orderTotalPrice }</p>
                    </div>
                  </div>
                  <Link href='/cart/checkout' className='text-white font-semibold p-5 text-center block rounded bg-blue-600 hover:scale-95 transition'>
                    GO TO CHECKOUT
                  </Link>
                </div>
              )
              : (
                <div className='grid place-content-center h-full text-center'>
                  <p className='font-semibold mb-5 text-2xl'>YOUR BAG IS EMPTY!</p>
                  <p className='mb-5'>There are no products in your bag.</p>
                  <div className='' onClick={ () => handleOpen(false) }>
                    <Link href='/products' className='font-semibold bg-blue-600 text-white p-2 px-4 rounded w-[200px] mx-auto hover:scale-95 transition'>
                    SHOP PRODUCTS
                    </Link>
                  </div>
                </div>
              )
          }
        </div>
      </aside>
    </Modal>
  );
};
