import { IOrder } from '@/interfaces';
import { transformDate } from '@/utils';
import { TableCell, TableRow } from '@/components/ui';

interface Props { order: IOrder; }

export const BodyRow = ({ order }: Props) => {
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
        <div>
          { order.shippingInfo.address }
        </div>
      </TableCell>
      <TableCell className='flex justify-end'>
        <div className={ `flex gap-2 w-28 py-[0.2rem] px-[0.1rem] ${ order.status === 'PENDING' ? 'bg-sky-200 text-sky-800' : (order.status === 'CANCELLED' ? 'bg-orange-300 text-orange-900' : 'bg-green-200 text-green-800') }  flex justify-center items-center rounded-lg` }>
          <span className={ `h-[4px] w-[4px] rounded-lg ${ order.status === 'PENDING' ? 'bg-sky-800 text-sky-800' : (order.status === 'CANCELLED' ? 'bg-orange-900 text-orange-900' : 'bg-green-800 text-green-800') } ` }></span>
          <span className='text-xs font-semibold'>{ order.status }</span>
        </div>
      </TableCell>
    </TableRow>
  );
};
