import Image from 'next/image';
import Link from 'next/link';

import { IProduct, TVariant } from '@/interfaces';

import { capitalizeWords } from '@/utils';
import { QuickAddMenu } from './QuickAddMenu';

interface Props {
  product: IProduct;
  variant: TVariant;
  withMenu: boolean;
}

export const ProductCard = ({ product, variant, withMenu = false }: Props) => {
  return (
    <article className='flex flex-col min-w-0 relative group'>
      <div className='relative'>
        <Link href={ `/products/${ variant.slug }` }>
          <div className='relative w-full h-full pt-[119%]'>
            <Image
              src={ variant.images[0] }
              alt={ product.title }
              fill
              sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 300px) 50vw'
            />
          </div>
        </Link> 
        { withMenu
            && 
            <QuickAddMenu product={ product } variant={ variant } /> }
      </div>
      <div className='pt-2'>
        <h4 className='leading-[1.3em] text-sm'>{ capitalizeWords(product.title) }</h4>
        <p className='text-gray-400 text-xs my-1'>
          { product.fitType && (product.fitType.charAt(0).toUpperCase() + product.fitType.slice(1).toLowerCase()) + ' ' +  '· ' }  { variant.color } 
        </p>
        <p className='font-semibold'>${ product.price }</p>
      </div>
    </article>
  );
};
