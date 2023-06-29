'use client';
import { useContext } from 'react';

import { AuthContext } from '@/context';
import { useOrders } from './useOrders';

import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/Table';
import { Pagination } from '@/components/ui';
import { BodyRow } from './BodyRows';
import { HeaderCols } from './HeaderCols';
import { Header } from './Header';

export const OrdersTable = () => {
  const { user } = useContext(AuthContext);
  const {
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
      <Table className='mt-6'>
        <TableHeader>
          <TableRow>
            <HeaderCols />
          </TableRow>
        </TableHeader>
        <TableBody>
          { orders.map(order => ( 
            <BodyRow key={ order._id } order={ order } /> 
          )) }
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
    </div>
  );
};
