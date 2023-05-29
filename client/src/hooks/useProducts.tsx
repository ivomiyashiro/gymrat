import { useEffect, useState } from 'react';

import { IProduct } from '@/interfaces';
import { getOneColorForVariant } from '@/utils';

interface Props {
  limit: number;
  page?: number;
  sortyBy?: string;
  orderBy?: 1 | -1;
  collection?: string; 
}

const DEFAULT_LIMIT = 15;
const DEFAULT_PAGE = 1;
const DEFAULT_SORTBY = 'title';
const DEFAULT_ORDERBY = 1;

export const useProducts = ({ 
  limit = DEFAULT_LIMIT, 
  page = DEFAULT_PAGE, 
  sortyBy = DEFAULT_SORTBY, 
  orderBy = DEFAULT_ORDERBY
}: Props) => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const resp = await fetch(process.env.API_BASE_URL + `/products?limit=${ limit }&page=${ page }&sortBy=${ sortyBy }&orderBy=${ orderBy }`);
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

  }, [limit, page, sortyBy, orderBy]);

  return {
    loading,
    error,
    products,
    pages
  };
};
