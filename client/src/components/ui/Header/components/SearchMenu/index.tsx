import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Cancel, NavArrowLeft } from 'iconoir-react';

import { useSearchMenu } from './useSearchMenu';

import { Modal } from '@/components/ui/Modal';
import { SearchedProducts } from './SearchedProducts';
import { TrendingSearches } from './TrendingSearches';
import { SearchbarInput } from './SearchbarInput';

interface Props {
  inputValue: string;
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  handleInputValue: Dispatch<SetStateAction<string>>;
}

export const SearchMenu = ({ inputValue, open, handleInputValue, handleOpen }: Props) => {

  const { 
    loading,
    products, 
    focus, 
    inputRef,
    handleFocus,
  } = useSearchMenu({ open, inputValue });

  return (
    <>
      <Modal isOpen={ open } handleOpen={ handleOpen } withBackground justify='start'>
        <aside className={ `fixed top-0 h-screen bg-white overflow-y-auto transition-all lg:h-auto scrollbar-hidden ${ open ? 'w-full' : 'w-0'}` }>
          <div className='relative p-4 flex items-center gap-4 lg:justify-center lg:border-b'>
            <button className='lg:hidden' onClick={ () => handleOpen(false) }>
              <NavArrowLeft width={ 38 } height={ 38 } />
            </button>
            <SearchbarInput
              focus={ focus }
              reference={ inputRef }
              value={ inputValue }
              loading={ loading }
              onClick={ () => handleInputValue('') }
              onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputValue(e.target.value) }
              onFocus={ () => handleFocus(true) }
              onBlur={ () => handleFocus(false) }
            />
            <button className='absolute hidden lg:block right-4' onClick={ () => handleOpen(false) }>
              <Cancel width={ 38 } height={ 38 } />
            </button>
          </div>
          {
            inputValue !== ''
              ? (
                loading 
                  ? <div className='h-[465px]'></div>
                  : <SearchedProducts products={ products } inputValue={ inputValue } />
              )
              : (
                <div className='p-4 max-w-[975px] mx-auto'>
                  <TrendingSearches />
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
