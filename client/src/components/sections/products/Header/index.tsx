import { useContext } from 'react';
import { FilterList, List, ViewGrid } from 'iconoir-react';
import { CatalogContext } from '@/context';

export const Header = () => {
  const { view, checkedFilters, handleView, toggleFilterMenu } = useContext(CatalogContext);

  return (
    <div className='flex justify-between md:items-end flex-col md:flex-row gap-6'>
      <div>
        <p className='font-semibold'>EXPLORE</p>
        <h1 className='font-bold leading-[1.15em]'>OUR PRODUCTS</h1>
      </div>
      <div className='flex justify-end gap-2'>
        <label className="relative inline-flex items-center cursor-pointer w-full md:hidden">
          <input 
            type="checkbox" 
            value="" 
            className="sr-only peer" 
            onChange={ handleView } 
            checked={ view === 'GRID' } 
          />
          <div className="relative w-full h-full bg-gray-200 rounded-lg peer flex items-center">    
            <div className='relative z-10 w-full flex justify-center'>
              <List width={ 28 } height={ 28 } />
            </div>
            <div className='relative z-10 w-full flex justify-center'>
              <ViewGrid width={ 28 } height={ 28 } />
            </div>  
          </div>
          <div className='flex items-center justify-center peer-checked:translate-x-[calc(100%+12px)] peer-checked:border-white absolute left-[6px] bg-white rounded-lg h-[45px] w-[calc(50%-12px)] transition-all'>
          </div>
        </label>
        <button 
          className='w-full flex justify-center gap-4 items-center rounded-lg p-4 px-6 font-semibold md:h-[50px] bg-blue-600 text-white hover:scale-95 transition-all relative' 
          onClick={ toggleFilterMenu }
        >
          <FilterList width={ 24 } height={ 24 } />
          FILTERS
          {
            checkedFilters !== 0
            &&
            <div className='absolute bg-orange-300 text-xs h-5 w-5 rounded-full flex items-center justify-center -top-2 -right-2 text-orange-900'>
              { checkedFilters }
            </div>
          }
        </button>
      </div>
    </div>
  );
};
