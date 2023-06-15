import Image from 'next/image';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';

import { FadeUpContainer } from '@/components/ui';

export const Hero = () => {
  return (
    <section className='relative h-[calc(100vh-102px)] max-h-[55rem]'>
      <FadeUpContainer className='absolute top-0 z-10 flex h-full justify-center flex-col p-4 lg:px-24 w-full max-w-[1640px] mx-auto left-[50%] right-[50%] translate-x-[-50%]'>
        <h1 className='block text-white font-bold leading-[1.15em]'>
          UNLEASH YOUR
          <br />
          INNER <span className='text-blue-500'>BEAST.</span>
        </h1>
        <p className='block transition duration-700 text-white mt-4 mb-8 max-w-[600px]'>
          Flex what you’ve built with physique-enhancing cuts,
          compressive fits and comfortable lifting essentials.
        </p>
        <Link href='/products' className='text-white px-6 py-3 w-[165px] rounded flex justify-center items-center gap-2 font-semibold bg-blue-600 transition hover:scale-95'>
          SEE MORE
          <NavArrowRight width={ 16 } height={ 16 } />
        </Link>
      </FadeUpContainer>
      <div className='relative top-0 w-full h-full z-0'>
        <Image
          src='/images/hero.jpg'
          alt='Gymrat hero image'
          style={ {
            objectFit: 'cover'
          } }
          fill
          priority
          sizes='100vw'
        />
      </div>
    </section>
  );
};
