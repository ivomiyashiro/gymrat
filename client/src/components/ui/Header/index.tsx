'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { MenuScale, Search, ShoppingBag, User } from 'iconoir-react';

import { CartContext } from '@/context';

import { GymratLogo } from '@/components/svgs';
import { DesktopNavItems, MobileMenu, SearchMenu, CartMenu } from './components';

export const Header = () => {

  const { totalProducts } = useContext(CartContext);

  const [inputValue, setInputValue] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchMenuOpen, setSearchMenuOpen] = useState(false);
  const [isCartMenuOpen, setCartMenuOpen] = useState(false);

  return (
    <header className='fixed top-0 w-full z-50 transition'>
      <div className='block bg-gray-950 w-full py-1'>
        <p className='text-xs text-center text-white'>This is a full-stack project created with React.js and Node.js</p>
      </div>
      <div className='grid grid-cols-3 w-full items-center px-4 h-[78px] lg:px-10 2xl:px-16 shadow-md bg-white'>
        <div>
          <div className='flex justify-start gap-5 lg:hidden'>
            <button onClick={ () => setMobileMenuOpen(true) }>
              <MenuScale width={ 30 } height={ 30 } />
            </button>
            <button onClick={ () => setSearchMenuOpen(true) }>
              <Search width={ 30 } height={ 30 } />
            </button>
          </div>
          <div className='hidden lg:block'>
            <Link href='/'>
              <GymratLogo color='#000' width={ 48 } height={ 48 } />
            </Link>
          </div>
        </div>
        <div className='flex justify-center items-center h-full'>
          <Link href='/' className='lg:hidden relative'>
            <GymratLogo color='#000' width={ 48 } height={ 48 } />
          </Link>
          <nav className='hidden lg:flex h-full'>
            <ul className='flex gap-10'>
              <DesktopNavItems href='/products?gender=women'>
                Women
              </DesktopNavItems>
              <DesktopNavItems href='/products?gender=women'>
                Men
              </DesktopNavItems>
              <DesktopNavItems href='/products?category=accesories'>
                Accesories
              </DesktopNavItems>
            </ul>
          </nav>
        </div>
        <div className='flex justify-end items-center gap-5 lg:gap-7'>
          <button className='hidden xl:flex w-[50%] bg-gray-100 hover:bg-gray-200 items-center p-3 rounded-md gap-2' onClick={ () => setSearchMenuOpen(true) }>
            <Search width={ 25 } height={ 25 } />
            <p className='text-sm'>
              { 
                inputValue 
                  ? <span> { inputValue } </span>
                  : <span className='text-gray-500'> Try a product or color </span>
              }
            </p>
          </button>
          <button className='hidden lg:block xl:hidden' onClick={ () => setSearchMenuOpen(true) }>
            <Search width={ 30 } height={ 30 } />
          </button>
          <Link href='/signin'>
            <User width={ 30 } height={ 30 } />
          </Link>
          <button className='relative' onClick={ () => setCartMenuOpen(true) }>
            <ShoppingBag width={ 30 } height={ 30 } />
            {
              totalProducts > 0
              &&
              <span className='absolute top-[-0.5em] left-5 text-xs w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded-full'>
                { totalProducts }
              </span>
            }
          </button>
        </div>
      </div>

      <MobileMenu 
        open={ isMobileMenuOpen } 
        inputValue={ inputValue }
        handleOpen={ setMobileMenuOpen } 
        handleOpenSearchMenu={ setSearchMenuOpen } 
      />
      <SearchMenu 
        open={ isSearchMenuOpen } 
        inputValue={ inputValue }
        handleInputValue={ setInputValue }
        handleOpen={ setSearchMenuOpen } 
      />
      <CartMenu 
        open={ isCartMenuOpen }
        handleOpen={ setCartMenuOpen }
      />
    </header>
  );
};
