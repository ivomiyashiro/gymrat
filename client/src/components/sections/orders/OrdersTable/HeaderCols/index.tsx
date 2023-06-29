import { TableHead } from '@/components/ui';

export const HeaderCols = () => {
  return (
    <>
      <TableHead className='font-semibold uppercase'>
        Order
      </TableHead>
      <TableHead className='min-w-[110px] font-semibold uppercase'>
        Date
      </TableHead>
      <TableHead className='min-w-[110px] font-semibold uppercase'>
        Items
      </TableHead>
      <TableHead className='min-w-[110px] font-semibold uppercase'>
        Total Price
      </TableHead>
      <TableHead className='min-w-[110px] font-semibold uppercase'>
        Shipping To
      </TableHead>
      <TableHead className='font-semibold uppercase text-right'>
        Status
      </TableHead>
    </>
  );
};
