'use client';
import { useContext } from 'react';

import { AuthContext } from '@/context';
import { useOrders } from './useOrders';

import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/Table';
import { Pagination } from '@/components/ui';
import { BodyRow } from './BodyRows';
import { HeaderCols } from './HeaderCols';
import { Header } from './Header';
import { RowSkeleton } from './RowSkeleton';

export const OrdersTable = () => {
  const { user } = useContext(AuthContext);
  const {
    limit,
    loading,
    searchText,
    page, 
    count, 
    totalPages, 
    orders,
    handlePageClick, 
    handleLimit,
    handleSearchText
  } = useOrders(user!);

  return (
    <div className='w-full'>
      <Header 
        searchText={ searchText }
        handleSearchText={ handleSearchText }
        handleLimit={ handleLimit } 
      />
      {
        (orders.length === 0) && (loading === false)
          ? (
            <div className='my-20 block'>
              <h3 className='font-semibold text-2xl text-center text-gray-500'>
                Oop! We couldn&rsquo;t find any orders...
              </h3>
            </div>
          )
          : (
            <>
              <Table className='mt-6'>
                <TableHeader>
                  <TableRow>
                    <HeaderCols />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { loading
                    ? (
                      new Array(limit).fill(null).map((_row, i) => ( 
                        <RowSkeleton key={ i } /> 
                      )) 
                    )
                    : (
                      orders.map(order => ( 
                        <BodyRow key={ order._id } order={ order } /> 
                      )) 
                    ) }
                </TableBody>
              </Table>
              <Pagination
                name='Orders'
                currentPage={ page }
                count={ count }
                page={ page }
                totalPages={ totalPages }
                onPageChange={ handlePageClick }
              />
            </>
          )
      }
    </div>
  );
};
