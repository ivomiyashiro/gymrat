import { TOrderStatus } from '@/interfaces';
import React from 'react';

export const RowMenu = ({ open, status }: { open: boolean, status: TOrderStatus }) => {
  return (
    <>
      {
        open
        &&
        <div className='absolute z-50'>
          <ul className='bg-white p-4 rounded shadow-lg'>
            <li className='py-1 hover:bg-gray-50'>Open Order</li>
            {
              status !== 'DELIVERED'
          &&
          <li className='py-1 hover:bg-gray-50'>
            { 
              status === 'CANCELLED' 
                ? 'Set as pending' 
                : 'Cancel order'
            }
          </li>
            }

          </ul>
        </div>
      }
    </>
  );
};
