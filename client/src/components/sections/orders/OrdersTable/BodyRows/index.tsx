import { Cancel, EyeAlt } from 'iconoir-react';

import { IOrder } from '@/interfaces';
import { transformDate } from '@/utils';

import { Spinner, TableCell, TableRow } from '@/components/ui';
import { useState } from 'react';

interface Props {
  order: IOrder;
  handleCancelOrder: (id: string) => Promise<void>
}

export const BodyRow = ({ order, handleCancelOrder }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    await handleCancelOrder(order._id);
    setLoading(false);
  };
  
  return (
    <TableRow key={ order._id }>
      <TableCell>
        <div>
          <span className='hover:underline'>
            #{ order.number }
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <span>{ transformDate(order.createdAt.toString()) }</span>
        </div>
      </TableCell>
      <TableCell>
        <div className='text-gray-600'>
          { order.items.length }
        </div>
      </TableCell>
      <TableCell>
        <div>
          { order.totalPrice } $
        </div>
      </TableCell>
      <TableCell>
        <div className={ `flex gap-2 items-center w-28 py-[0.2rem] px-[0.1rem] ${ order.status === 'PENDING' ? 'bg-sky-200 text-sky-800' : (order.status === 'CANCELLED' ? 'bg-orange-300 text-orange-900' : 'bg-green-200 text-green-800') }  flex justify-center items-center rounded-xl` }>
          <span className={ `h-[4px] w-[4px] rounded-full ${ order.status === 'PENDING' ? 'bg-sky-800 text-sky-800' : (order.status === 'CANCELLED' ? 'bg-orange-900 text-orange-900' : 'bg-green-800 text-green-800') } ` }></span>
          <span className='text-xs font-semibold'>{ order.status }</span>
        </div>
      </TableCell>
      <TableCell className='flex justify-end items-center pr-4 relative gap-3'>
        { 
          order.status === 'PENDING'
          &&
          <button 
            disabled={ loading }
            className='py-2 flex gap-1 bg-red-500 text-white text-sm px-3 rounded items-center w-[100px] justify-center' 
            onClick={ handleCancel }
          >
            {
              false
                ? <Spinner size='5' />
                : (
                  <>
                    <Cancel fontSize={ 12 } />
                    <span>Cancel</span>
                  </>
                )
            }
          </button>
        }
        <button className='py-2 flex gap-1 bg-blue-500 text-white text-sm px-3 rounded items-center w-[100px] justify-center'>
          <EyeAlt fontSize={ 12 } />
          <span>Details</span>
        </button>

      </TableCell>
    </TableRow>
  );
};
