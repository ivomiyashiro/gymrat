'use client';
import { useContext } from 'react';
import { Cancel } from 'iconoir-react';

import { CatalogContext } from '@/context';

import { Modal } from '@/components/ui/Modal';
import { FiltersMenuItem } from './FiltersMenuItem';

export const FiltersMenu = () => {

  const { filterMenuOpen, filters, checkedFilters, toggleFilterMenu, resetFilters } = useContext(CatalogContext);

  return (
    <Modal isOpen={ filterMenuOpen } handleOpen={ toggleFilterMenu } withBackground>
      <aside className={ `fixed top-0 right-0 h-screen bg-white z-50 transition-all overflow-hidden ${ filterMenuOpen ? 'w-full lg:w-[470px]' : 'w-[0px]' }` }>
        <div className='flex flex-col h-full relative'>
          <div className='p-4 shadow flex items-center justify-between'>
            <h2 className='font-bold text-3xl'>FILTERS</h2>
            <button aria-label='Close' className=' h-9 w-9 rounded-md flex items-center justify-center' onClick={ toggleFilterMenu }>
              <Cancel width={ 28 } height={ 28 } strokeWidth={ 1.7 } />
            </button>
          </div>
          <div className='p-4 pt-2 h-full flex flex-col overflow-y-scroll scrollbar-hidden'>
            {
              filters?.map(({ _id, name, values }: any) => (
                <FiltersMenuItem 
                  key={ _id }
                  filterId={ _id }
                  title={ name }
                  values={ values } 
                />
              ))
            }
          </div>
          {
            filters.length > 0
            &&
            <button className='m-4 text-white font-semibold p-5 text-center block rounded bg-blue-600 hover:scale-95 transition disabled:bg-gray-200 disabled:text-gray-400' disabled={ checkedFilters === 0 } onClick={ resetFilters }>
              RESET FILTERS
            </button>
          }
        </div>
      </aside>
    </Modal>
  );
};



