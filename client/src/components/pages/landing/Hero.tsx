import Image from 'next/image';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';

import { FadeUpContainer } from '@/components/ui';

export const Hero = () => {
  return (
    <section className='relative h-[calc(100vh-102px)]'>
      <FadeUpContainer className='absolute top-0 z-10 h-full flex justify-center flex-col p-4 lg:px-10'>
        <h1 className='block text-white font-bold leading-[1.15em]'>
          UNLEASH YOUR
          <br />
          INNER <span className='text-orange-600'>BEAST.</span>
        </h1>
        <p className='block transition duration-700 text-white mt-4 mb-8 max-w-[600px]'>
          Flex what you’ve built with physique-enhancing cuts,
          compressive fits and comfortable lifting essentials.
        </p>
        <Link href='/products' className='bg-blue-600 text-white px-6 py-3 w-[165px] rounded flex justify-center items-center gap-2 font-semibold'>
          SEE MORE
          <NavArrowRight width={ 16 } height={ 16 } />
        </Link>
      </FadeUpContainer>
      <div className='relative top-0 w-full max-h-[770px] h-full z-0'>
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
