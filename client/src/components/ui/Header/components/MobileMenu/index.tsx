import { Dispatch, SetStateAction } from 'react';
import { Cancel, Search } from 'iconoir-react';

import { useMobileMenu } from './useMobileMenu';

import { GymratLogo } from '@/components/svgs';
import { MobileNavItems } from './MobileNavItems';

interface Props {
  open: boolean;
  inputValue: string;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenSearchMenu: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu = ({ open, inputValue, handleOpen, handleOpenSearchMenu }: Props) => {

  const { mobileMenuRef, handleTransitionEnd } = useMobileMenu({ open });

  return (
    <aside>
      <span 
        className={ `fixed lg:hidden top-0 h-screen bg-black flex items-center justify-center transition-all ${ open ? 'w-full' : 'w-[0px] transition-none' }` }
        onTransitionEnd={ handleTransitionEnd }
      >
        <GymratLogo 
          color='#fff'
          width={ 100 }
          height={ 100 }
        />
      </span>
      <div 
        className={ `fixed grid grid-rows-[151px,1fr] top-0 h-screen bg-white overflow-hidden transition-opacity duration-700 lg:hidden ${ !open && 'opacity-0' } ` }
        ref={ mobileMenuRef }
      >
        <div>
          <div className='flex justify-end py-3 px-4'>
            <button onClick={ () => handleOpen(false) }>
              <Cancel width={ 38 } height={ 38 } />
            </button>
          </div>
          <div className='px-4 mb-4'>
            <h2 className='text-lg font-semibold mb-3'>SHOP</h2>
            <button className='w-full bg-gray-100 hover:bg-gray-200 flex items-center p-3 rounded-md gap-2' onClick={ () => handleOpenSearchMenu(true) }>
              <Search width={ 25 } height={ 25 } />
              <p className='text-sm'>
                { 
                  inputValue 
                    ? <span> { inputValue } </span>
                    : <span className='text-gray-500'> Try a product or color </span>
                }
              </p>
            </button>
          </div>
        </div>
        <nav className='h-full p-4'>
          <ul className='grid grid-rows-3 h-full gap-4'>
            <MobileNavItems 
              open={ open }
              href='/products?filters=%5B%7B%22gender%22%3A%5B%22WOMEN%22%5D%7D%5D&sortBy=CREATEDAT&orderBy=-1'
              imageUrl='/images/women.jpeg'
              altText='Image of 2 women taking a pick with a phone'
              onClick={ () => handleOpen(false) }
            >
              WOMEN
            </MobileNavItems>          
            <MobileNavItems 
              open={ open }
              href='/products?filters=%5B%7B%22gender%22%3A%5B%22MEN%22%5D%7D%5D&sortBy=CREATEDAT&orderBy=-1'
              imageUrl='/images/men.png'
              altText='Image of 2 men posing'
              onClick={ () => handleOpen(false) }
            >
              MEN
            </MobileNavItems>
            <MobileNavItems 
              open={ open }
              href='/products?filters=%5B%7B%22category%22%3A%5B%22ACCESSORIES%22%5D%7D%5D&sortBy=CREATEDAT&orderBy=-1'
              imageUrl='/images/accesories.jpeg'
              altText='Image of a men benching'
              onClick={ () => handleOpen(false) }
            >
              ACCESSORIES
            </MobileNavItems>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
