import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { Cancel, NavArrowLeft, Search } from 'iconoir-react';

import { useSearchMenu } from './useSearchMenu';

import { Modal } from '@/components/ui/Modal';
import { ProductsList } from '@/components/ui/ProductsList';

interface Props {
  inputValue: string;
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  handleInputValue: Dispatch<SetStateAction<string>>;
}

const TRENDING_SEARCHES = ['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS'];

export const SearchMenu = ({ inputValue, open, handleInputValue, handleOpen }: Props) => {

  const { 
    products, 
    focus, 
    inputRef,
    handleFocus,
  } = useSearchMenu({ open, inputValue });

  return (
    <>
      <Modal isOpen={ open } handleOpen={ handleOpen } withBackground justify='start'>
        <aside className={ `fixed top-0 h-screen bg-white overflow-scroll transition-all lg:h-auto scrollbar-hidden ${ open ? 'w-full' : 'w-0'}` }>
          <div className='p-4 flex items-center gap-4 lg:justify-center lg:border-b'>
            <button className='lg:hidden' onClick={ () => handleOpen(false) }>
              <NavArrowLeft width={ 38 } height={ 38 } />
            </button>
            <div className={ `w-full bg-gray-100 hover:bg-gray-200 flex items-center p-3 rounded-md gap-2 border lg:w-[400px] lg:ml-auto ${ focus ? 'border-black bg-gray-200' : 'border-transparent'}` }>
              <Search width={ 25 } height={ 25 } />
              <input 
                type="text" 
                placeholder='Try a product or color'
                className='bg-transparent outline-none w-full text-sm'
                ref={ inputRef }
                value={ inputValue }
                onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value) }
                onFocus={ () => handleFocus(true) }
                onBlur={ () => handleFocus(false) }
              />
            </div>
            <button className='hidden lg:block lg:ml-auto' onClick={ () => handleOpen(false) }>
              <Cancel width={ 38 } height={ 38 } />
            </button>
          </div>
          {
            products.length > 0
              ? (
                <div className='p-4 max-w-[975px] mx-auto'>
                  <p className='block lg:border-b font-semibold lg:pb-2'>PRODUCTS</p>
                  <ProductsList products={ products } />
                  {
                    products.length < 6
                    &&
                    <div className='py-4 border-t flex justify-end mt-10 lg:mt-4'>
                      <Link href={ `/products?search=${ inputValue }` }>
                        View all &quot;<span className='font-semibold underline'>{ inputValue }</span>&quot;
                      </Link>
                    </div>
                  }
                </div>
              )
              : (
                <div className='p-4 max-w-[900px] mx-auto'>
                  <p className='font-semibold'>TREANDING SEARCHES</p>
                  <div className='mt-4 flex overflow-x-scroll scrollbar-hidden pb-4'>
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
              )
          }
        </aside>
      </Modal>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `} 
      </style>
    </>
  );
};
