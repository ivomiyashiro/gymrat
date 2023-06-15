'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IProduct } from '@/interfaces';
import { getOneColorForVariant } from '@/utils';

interface IParams {
  limit: number;
  page?: number;
  sortBy?: string;
  orderBy?: 1 | -1;
  filters?: any[];
}

const DEFAULT_LIMIT = 15;
const DEFAULT_PAGE = 1;
const DEFAULT_SORTBY = 'CREATEDAT';
const DEFAULT_ORDERBY = 1;

export const useProducts = (params: IParams, asAdmin: boolean = false) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [adaptedProducts, setAdaptedProducts] = useState<IProduct[]>([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  let adaptedURLFilters = '';
  const paramsFilters = searchParams.get('filters') as string;

  const { limit = DEFAULT_LIMIT, page = DEFAULT_PAGE, sortBy = DEFAULT_SORTBY, orderBy = DEFAULT_ORDERBY, filters } = params;
  
  if (filters) {
    adaptedURLFilters = encodeURIComponent(JSON.stringify(filters));
  } else {
    adaptedURLFilters = encodeURIComponent(paramsFilters);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const url = `${process.env.API_BASE_URL}/${asAdmin ? 'admin' : 'storefront'}/products?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}${paramsFilters ? `&filters=${ adaptedURLFilters }` : ''}`;
        const resp = await fetch(url);
        const { ok, products: fetchedProducts, totalPages, error: apiError } = await resp.json();

        if (!ok) return setError(apiError);

        setProducts(fetchedProducts);
        setAdaptedProducts(getOneColorForVariant(fetchedProducts));

        setPages(totalPages);

      } catch (error: any) {
        console.error(error);
        setError('Error al obtener los productos');

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortBy, orderBy, searchParams, asAdmin]);

  return {
    adaptedProducts,
    loading,
    error,
    products,
    pages
  };
};
