import { TableCell, TableRow } from '@/components/ui';
import React from 'react';

export const RowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <div className='animate-skeleton-loading rounded w-full h-6'></div>
      </TableCell>
      <TableCell>
        <div className='animate-skeleton-loading rounded w-full h-6'></div>
      </TableCell>
      <TableCell>
        <div className='animate-skeleton-loading rounded w-full h-6'></div>
      </TableCell>
      <TableCell>
        <div className='animate-skeleton-loading rounded w-full h-6'></div>
      </TableCell>
      <TableCell>
        <div className='animate-skeleton-loading rounded w-full h-6'></div>
      </TableCell>
      <TableCell>
        <div className='animate-skeleton-loading rounded w-full h-6'></div>
      </TableCell>
    </TableRow>
  );
};
