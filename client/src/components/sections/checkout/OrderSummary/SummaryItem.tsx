import Image from 'next/image';
import { TVariant } from '@/interfaces';

interface Props {
  title: string;
  quantity: number;
  price: number;
  featImageUrl: string;
  fitType: string;
  variant: TVariant;
}

export const SummaryItem = ({ title, featImageUrl, fitType, variant, price, quantity }: Props) => {
  return (
    <article className='flex relative w-full overflow-visible'>
      <div className='relative block w-[8rem] max-h-[10rem] min-h-[10rem] lg:w-[7rem] lg:max-h-[8.5rem] lg:min-h-[8.5rem] mr-4 rounded'>
        <span className='absolute top-[-0.5em] right-[-0.5em] w-5 h-5 text-xs bg-orange-400 flex items-center justify-center rounded-full text-white z-50'>
          { quantity }
        </span>
        <Image
          src={ featImageUrl }
          alt={ title }
          style={ {
            'borderRadius': '0.25rem'
          } }
          sizes='(min-width: 768px) 12.4rem, 10rem'
          fill
        />
      </div>
      <div className='flex-[1_1] flex flex-col gap-1 w-full'>
        <p>{ title }</p>
        <p className='text-gray-500 text-sm'>
          { fitType && (fitType.charAt(0).toUpperCase() + fitType.slice(1).toLowerCase())}  
        </p>
        <p className='text-gray-500 text-sm flex justify-between'>
          <span>
            { variant.color } 
            { variant.size !== 'UNIQUE' && ' | ' + variant.size }
          </span>
          <span className='text-black text-sm'>${ price }</span>
        </p>
      </div>
    </article>
  );
};
