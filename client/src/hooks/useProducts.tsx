'use client';
import { useEffect, useState } from 'react';

import { IProduct, IProductFilters } from '@/interfaces';
import { getOneColorForVariant } from '@/utils';

interface IParams {
  limit: number;
  page?: number;
  sortBy?: string;
  orderBy?: 1 | -1;
  filters?: IProductFilters[];
}

const DEFAULT_LIMIT = 15;
const DEFAULT_PAGE = 1;
const DEFAULT_SORTBY = 'title';
const DEFAULT_ORDERBY = 1;
const DEFAULT_FILTERS = [{}];

export const useProducts = (params: IParams, asAdmin: boolean = false) => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const { limit = DEFAULT_LIMIT, page = DEFAULT_PAGE, sortBy = DEFAULT_SORTBY, orderBy = DEFAULT_ORDERBY, filters = DEFAULT_FILTERS } = params;
  const adaptedFilters = encodeURIComponent(JSON.stringify(filters));

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const resp = await fetch(process.env.API_BASE_URL + `/${ asAdmin ? 'admin' : 'storefront' }/products?limit=${ limit }&page=${ page }&sortBy=${ sortBy }&orderBy=${ orderBy }&filters=${ adaptedFilters }`);
        const { ok, products, totalPages } = await resp.json();

        if (!ok) return;

        setProducts(getOneColorForVariant(products));
        setPages(totalPages);

      } catch (error: any) {
        console.log(error);
        setError(error);

      } finally {
        setLoading(false);

      }
    };

    getProduct();

  }, [limit, page, sortBy, orderBy, adaptedFilters, asAdmin]);

  return {
    loading,
    error,
    products,
    pages
  };
};
