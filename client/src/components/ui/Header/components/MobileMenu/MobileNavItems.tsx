import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavArrowRight } from 'iconoir-react';

interface Props {
  open: boolean;
  href: string;
  imageUrl: string;
  altText: string;
  children: ReactNode;
  onClick: () => void;
}

export const MobileNavItems = ({ open, href, imageUrl, altText, children, onClick }: Props) => {
  return (
    <li className='h-full relative top-0' onClick={ onClick }>
      <Link href={ href }>
        <div className='w-full h-full absolute top-0'>
          <Image
            src={ imageUrl }
            alt={ altText }
            style={ {
              objectFit: 'cover',
              borderRadius: '0.5em'
            } }
            sizes='100vw'
            fill
          />
        </div>
        <div className='flex items-center justify-between absolute bottom-0 w-full bg-gradient-to-t h-[60px] px-4 from-black rounded-b-[0.5em]'>
          <div className='relative h-full w-full overflow-hidden'>
            <p className={ `text-white font-semibold text-xl absolute transition-all delay-300 ${ open ? 'top-[15px]' : 'top-[100px]'}` }>
              { children }
            </p>
          </div>
          <button className='min-w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center animate-pulse'>
            <NavArrowRight width={ 20 } height={ 20 } />
          </button>
        </div>
      </Link>
    </li>
  );
};
