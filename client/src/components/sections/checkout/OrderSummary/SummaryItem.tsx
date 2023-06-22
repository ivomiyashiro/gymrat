import Image from 'next/image';
import { TVariant } from '@/interfaces';

interface Props {
  title: string;
  price: number;
  featImageUrl: string;
  fitType: string;
  variant: TVariant;
}

export const SummaryItem = ({ title, featImageUrl, fitType, variant, price }: Props) => {
  return (
    <article className='flex relative w-full overflow-visible'>
      <div className='relative block w-[8rem] max-h-[10rem] min-h-[10rem] lg:w-[7rem] lg:max-h-[8.5rem] lg:min-h-[8.5rem] mr-4 rounded overflow-hidden'>
        <Image
          src={ featImageUrl }
          alt={ title }
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
