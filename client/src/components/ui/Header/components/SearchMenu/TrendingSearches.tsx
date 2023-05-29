import Link from 'next/link';

const TRENDING_SEARCHES = ['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS'];

export const TrendingSearches = () => {
  return (
    <>
      <div className='max-w-[975px] mx-auto'>
        <p className='font-semibold'>TREANDING SEARCHES</p>
        <div className='mt-4 flex overflow-x-auto scrollbar-hidden pb-4'>
          <ul className='flex gap-2'>
            {
              TRENDING_SEARCHES.map(( trendingSearch, i) => (
                <li key={ i }>
                  <Link href={ `products?search=${ trendingSearch }` } className='bg-gray-100 py-1 px-3 text-xs whitespace-nowrap rounded-md'>
                    { trendingSearch }
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `} 
      </style>
    </>

  );
};
