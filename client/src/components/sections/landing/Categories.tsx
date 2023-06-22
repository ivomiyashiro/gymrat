'use client';
import Image from 'next/image';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';

export const Categories = () => {

  const categories = [
    { id: 1, title: 'SHOP WOMEN', image: '/images/women-mobile.jpeg', href: '/products?filters=%5B%7B%22gender%22%3A%5B%22WOMEN%22%5D%7D%5D&sortBy=CREATEDAT&orderBy=-1' }, 
    { id: 2, title: 'SHOP MEN', image: '/images/men-mobile.jpeg', href: '/products?filters=%5B%7B%22gender%22%3A%5B%22MEN%22%5D%7D%5D&sortBy=CREATEDAT&orderBy=-1' }, 
    { id: 3, title: 'SHOP ACCESORIES', image: '/images/accesories-mobile.jpeg', href: '/products?filters=%5B%7B%22category%22%3A%5B%22ACCESSORIES%22%5D%7D%5D&sortBy=CREATEDAT&orderBy=-1' }
  ];

  return (
    <section className='px-4 pY-12 lg:px-24 max-w-[1640px] mx-auto'>
      <div className='flex md:flex-row flex-col md:overflow-x-scroll h-full w-full scrollbar-hidden gap-3'>
        {
          categories.map(card => (
            <div key={ card.id } className='relative flex-shrink-0 overflow-hidden md:w-[21.525rem] xl:w-[calc(100%/3+0.369rem-(2)*0.492rem)] md:h-[26.72rem] lg:h-auto'>
              <Link href={ card.href }>
                <article>
                  <div className='w-full pt-[130.5%]'></div>
                  <div className='absolute top-0 left-0 h-full flex flex-col justify-end w-full overflow-hidden rounded-[1em] px-6 py-9'>
                    <Image 
                      src={ card.image }
                      alt={ card.title }
                      sizes='100vw'
                      fill
                    />
                    <div className='absolute bottom-0 left-0 right-0 w-full h-[14.76rem] opacity-80 bg-gradient-to-t from-black '></div>
                    <h3 className='z-10 text-white text-2xl font-semibold'>{ card.title }</h3>
                    <button className='absolute right-5 bottom-8 w-10 h-10 p-2 flex z-10 rounded-full justify-center items-center animate-pulse bg-white'>
                      <NavArrowRight width={ 20 } height={ 20 } />
                    </button>
                  </div>
                </article>
              </Link>
            </div>
          ))
        }
      </div>
    </section>
  );
};
