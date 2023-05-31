import Image from 'next/image';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';

interface Props {
  title: string;
  p1: string;
  p2?: string;
  altText: string;
  image: string;
  buttonText: string;
  reverse: boolean;
}

export const Banner = ({ title, p1, p2, image, altText, reverse, buttonText }: Props) => {
  return (
    <div className={ `flex flex-col md:flex-row gap-8 2xl:gap-20 justify-between items-center  ${ reverse && 'md:!flex-row-reverse' }` }>
      <div className='relative w-full lg:w-[50%] 2xl:w-[60%] h-[30rem] lg:h-[35rem] md:order-1'>
        <Image 
          src={ image } 
          alt={ altText }
          style={ {
            objectFit: 'cover',
            borderRadius: '1rem'
          } }
          sizes='100vw'
          fill
          quality={ 100 }
        />
      </div>
      <div className='lg:w-[34.7222222222vw] flex-[1_1] lg:flex-[unset]'>
        <h2 className='font-bold leading-[1.15em]'>
          { title }
        </h2>
        <p className='mt-4'>
          { p1 }
        </p>
        <p className='mt-4'>
          { p2 }
        </p>
        <Link href='/products' className='mt-8 text-white px-6 py-3 w-[185px] rounded flex justify-center items-center gap-2 font-semibold bg-blue-600 transition hover:scale-95'>
          { buttonText }
          <NavArrowRight width={ 16 } height={ 16 } />
        </Link>
      </div>
    </div>
  );
};
