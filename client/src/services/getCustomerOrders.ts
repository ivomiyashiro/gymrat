import { TOrderBy, TSortBy } from '@/interfaces';

interface Params {
  limit?: number;
  sortBy?: TSortBy;
  orderBy?: TOrderBy;
  page?: number;
  searchText?: string;
}

export const getCustomerOrders = async (customerId: string, params: Params) => {
  const { limit, sortBy, orderBy, page, searchText } = params;

  try {
    const url = `${process.env.API_BASE_URL}/storefront/user/${ customerId }/orders?limit=${ limit }&sortBy=${ sortBy }&orderBy=${ orderBy }&page=${ page }${ searchText && `&search=${ searchText }`}`;

    const response = await fetch(url, {
      credentials: 'include',
    });
    const { ok, orders, count, totalPages, msg } = await response.json();
    if (!ok) throw new Error(msg);

    return { orders, count, totalPages };
    
  } catch (error) {
    console.log(error);

    return { orders: [], count: 0, totalPage: 0 };
  }
};
