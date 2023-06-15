import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

const TRENDING_SEARCHES = ['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS'];

interface Props {
  handleOpen: Dispatch<SetStateAction<boolean>>;
}

export const TrendingSearches = ({ handleOpen }: Props) => {
  return (
    <div className='max-w-[975px] mx-auto'>
      <p className='font-semibold'>TREANDING SEARCHES</p>
      <div className='mt-4 flex overflow-x-auto scrollbar-hidden pb-4'>
        <ul className='flex gap-2'>
          {
            TRENDING_SEARCHES.map((trendingSearch, i) => {
              const trendingURL = encodeURIComponent(JSON.stringify([{ category: [trendingSearch] }]));
              return (
                <li key={ i }>
                  <Link href={ `products?filters=${ trendingURL }` } className='bg-gray-100 py-1 px-3 text-xs whitespace-nowrap rounded-md' onClick={ () => handleOpen(false) }>
                    { trendingSearch }
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
