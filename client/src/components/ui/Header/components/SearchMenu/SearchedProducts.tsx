import Link from 'next/link';
import { IProduct } from '@/interfaces';

import { SearchedProductsList } from './SearchedProductsList';
import { TrendingSearches } from './TrendingSearches';

interface Props {
  products: IProduct[];
  inputValue: string;
}

export const SearchedProducts = ({ products, inputValue }: Props) => {
  return (
    <>
      <div className='p-4 max-w-[975px] mx-auto'>
        {
          products.length > 0
            ? (
              <>
                <p className='block font-semibold lg:pb-2'>PRODUCTS</p>
                <SearchedProductsList products={ products } />
                <div className='border-t flex justify-end mt-10 lg:mt-4 pt-3'>
                  <Link href={ `/products?search=${ inputValue }` }>
                      View all &quot;<span className='font-semibold underline'>{ inputValue }</span>&quot;
                  </Link>
                </div>
              </>
            )
            : (
              <>
                <p className='block font-semibold lg:pb-2'>NO RESULTS FOUND</p>
                <p className='text-gray-500'>We are sorry but we can’t find any results for &quot;{ inputValue }&quot;</p>
                <div className='mt-8'>
                  <TrendingSearches />
                </div>
              </>
            )
        }
      </div>
    </>
  );
};
