import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Cancel, Search } from 'iconoir-react';

import { MobileNavItems } from './MobileNavItems';
import { GymratLogo } from '@/components/svgs';

interface Props {
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenSearchMenu: Dispatch<SetStateAction<boolean>>;
}

export const MobileMenu = ({ open, handleOpen, handleOpenSearchMenu }: Props) => {

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const handleTransitionEnd = () => {
    setTimeout(() => {
      if (mobileMenuRef.current) {
        mobileMenuRef.current.style.opacity = '100';
      }
    });
  };

  useEffect(() => {
    if (!open && mobileMenuRef.current) {
      mobileMenuRef.current.style.opacity = '0';
      mobileMenuRef.current.style.pointerEvents = 'none';
    } else if (open && mobileMenuRef.current) {
      mobileMenuRef.current.style.width = '100%';
      mobileMenuRef.current.style.pointerEvents = 'all';
    }

    const timeout = setTimeout(() => {
      if (!open && mobileMenuRef.current) {
        mobileMenuRef.current.style.width = '0';
      }
    }, 700);

    return () => clearTimeout(timeout);

  }, [open]);

  return (
    <aside>
      <span 
        className={ `fixed top-0 h-screen bg-black flex items-center justify-center transition-all ${ open ? 'w-full' : 'w-[0px] transition-none' }` }
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
              <p className='text-gray-500 text-sm'>Try a product or color</p>
            </button>
          </div>
        </div>
        <nav className='h-full p-4'>
          <ul className='grid grid-rows-3 h-full gap-4'>
            <MobileNavItems 
              open={ open }
              href='/products?gender=women'
              imageUrl='/images/women.jpeg'
              altText='Image of 2 women taking a pick with a phone'
            >
              WOMEN
            </MobileNavItems>          
            <MobileNavItems 
              open={ open }
              href='/products?gender=men'
              imageUrl='/images/men.png'
              altText='Image of 2 men posing'
            >
              MEN
            </MobileNavItems>
            <MobileNavItems 
              open={ open }
              href='/products?category=accesories'
              imageUrl='/images/accesories.jpeg'
              altText='Image of a men benching'
            >
              ACCESSORIES
            </MobileNavItems>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
