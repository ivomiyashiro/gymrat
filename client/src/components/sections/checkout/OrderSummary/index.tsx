'use client';
import { useContext, useState } from 'react';
import { NavArrowDown, NavArrowUp, ShoppingBag } from 'iconoir-react';

import { CartContext } from '@/context';

import { GymratLogo } from '@/components/svgs';
import { SummaryItem } from './SummaryItem';

export const OrderSummary = () => {
  const { cart, orderDiscount, orderTotalPrice } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <div className='lg:order-1 w-full lg:w-[85%] lg:h-full bg-gray-100 lg:border-l lg:border-b-0 border-b'>
      <div className='bg-white p-5 flex justify-center border-b lg:hidden'>
        <GymratLogo width={ 40 } height={ 30 } />
      </div>
      <button className={ `w-full lg:hidden flex justify-between p-4 py-3  ${open ? 'border-b' : ''}` } onClick={ () => setOpen(prev => !prev) }>
        <div className='flex items-center gap-1'> 
          <ShoppingBag className='text-blue-500' />
          <p className='flex items-center mt-1 text-blue-500 gap-1 text-sm'>
            {
              open
                ? (
                  <>
                    { 'Hide order summary' }
                    <NavArrowUp width={ 16 } height={ 16 } />
                  </>
                )
                : (
                  <>
                    { 'Show order summary' }
                    <NavArrowDown width={ 16 } height={ 16 } />
                  </>
                )
            }
          </p>
        </div>
        <h3 className='font-semibold text-xl'>
          ${ orderTotalPrice }
        </h3>
      </button>
      <div className={ `lg:max-w-[475px] mx-auto gap-6 flex flex-col lg:items-center lg:pt-[5em] px-4  lg:!h-full ${ open ? 'h-full my-4 overflow-auto scrollbar-hidden max-h-[650px]' : 'h-0 overflow-hidden'}` }>
        {
          cart.map(({ title, featImageUrl, variant, _id, price, fitType, quantity }) => (
            <SummaryItem 
              key={ _id }
              title={ title }
              featImageUrl={ featImageUrl } 
              variant={ variant }
              price={ price }
              fitType={ fitType }
              quantity={ quantity }
            />
          ))
        }
        <div className='w-full mt-5'>
          <div className='flex justify-between border-b border-t py-3'>
            <p className='text-sm'>Subtotal</p>
            <p className='text-sm'>${ orderTotalPrice }</p>
          </div>
          {
            orderDiscount !== 0
            &&
            <div className='flex justify-between border-b'>
              <p className='text-sm'>DISCOUNT</p>
              <p className='text-sm'>- $ { orderDiscount }</p>
            </div>
          }
          <div className='flex justify-between items-center py-3'>
            <p className='font-semibold'>TOTAL</p>
            <p className='font-semibold text-2xl'>${ orderTotalPrice }</p>
          </div>
        </div>
      </div>
    </div>
  );
};
