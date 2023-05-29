import Image from 'next/image';
import Link from 'next/link';

import { TFitType } from '@/interfaces';

import { capitalizeWords } from '@/utils';

interface Props {
  discountPrice?: number;
  featImageUrl: string;
  fitType: TFitType;
  price: number;
  title: string;
  color: string;
  slug: string;
}

export const ProductCard = ({ featImageUrl, fitType, price, color, title, slug }: Props) => {
  return (
    <article className='flex flex-col min-w-0 relative'>
      <div className='relative'>
        <div className='relative'>
          <Link href={ `/products/${ slug }` }>
            <div className='relative w-full h-full pt-[119%]'>
              <Image
                src={ featImageUrl }
                sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 300px) 50vw'
                fill
                alt={ title }
              />
            </div>
          </Link>
        </div>
        <div className='pt-2'>
          <h4 className='leading-[1.3em] text-sm'>{ capitalizeWords(title) }</h4>
          <p className='text-gray-400 text-xs my-1'>
            { fitType && (fitType.charAt(0).toUpperCase() + fitType.slice(1).toLowerCase()) + ' ' +  '· ' }  { color } 
          </p>
          <p className='font-semibold'>${ price }</p>
        </div>
      </div >
    </article>
  );
};
