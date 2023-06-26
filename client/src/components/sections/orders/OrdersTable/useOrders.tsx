import { useContext, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks';
import { getCustomerOrders, cancelDBOrder } from '@/services';
import { IOrder, IUser } from '@/interfaces';
import { ToastContext } from '@/context';

export const useOrders = (user: IUser) => {
  const { showToast } = useContext(ToastContext);

  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const debaucedValue = useDebounce(searchText);

  useEffect(() => {
    if (user) {
      const getUserOrders = async () => {
        const { orders, count, totalPages } = await getCustomerOrders(user!._id, {
          limit,
          orderBy: -1,
          sortBy: 'CREATEDAT',
          page,
          searchText: debaucedValue,
        });
        setOrders(orders);
        setCount(count);
        setTotalPages(totalPages);
        setLoading(false);
      };

      setLoading(true);
      getUserOrders();
    }
  }, [user, limit, page, debaucedValue]);

  const handlePageClick = (pageNumber: number) => {
    if (loading) return;
    setPage(pageNumber);
  };

  const cancelOrder = async (id: string) => {
    const { order } = await cancelDBOrder(user._id, id);

    setOrders(prev => {
      return prev.map(order => {
        if (order._id !== id) return order;

        return {
          ...order,
          status: 'CANCELLED'
        };
      });
    });

    showToast({
      type: 'WARNING',
      title: `Order #${order.number} cancelled.`,
      content: 'Your order has been cancelled.'
    });
  };

  return { 
    limit, 
    count, 
    totalPages, 
    orders, 
    page, 
    loading,
    searchText,
    cancelOrder,
    handlePageClick, 
    handleLimit: setLimit,
    handleSearchText: setSearchText
  };
};
