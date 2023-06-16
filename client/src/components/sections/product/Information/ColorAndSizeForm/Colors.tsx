'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getOneColorForVariant } from '@/utils';
import { IProduct, TVariant } from '@/interfaces';


interface Props {
  product: IProduct;
  variant: TVariant;
}

export const Colors = ({ product, variant }: Props) => {
  const variants = getOneColorForVariant([product])[0];
  const router = useRouter();

  return (
    <div className='mt-6 lg:mt-8'>
      <h3 className='font-semibold'>
        COLOR: 
        <span className='text-gray-500 font-normal ml-2'>{ variant?.color }</span>
      </h3>
      <div className='flex flex-wrap w-full gap-1 mt-3'>
        {
          variants.variantsToPrint.map(vari => {
            return (
              <button
                key={ vari._id }
                type='button'
                className={ `relative max-w-[4.6875rem] min-w-[3.125rem] float-left block h-[5.5rem] w-[calc(20%-0.25em)] rounded overflow-hidden border ${ variant?.color === vari.color ? 'border-black' : 'border-transparent'}` }
                disabled={ vari.color === variant.color }
                onClick={ () => router.push(`/products/${ vari.slug }`) }
              >
                <Image
                  src={ vari.images[0] }
                  alt={ product.title }
                  style={ {
                    objectFit: 'cover'
                  } }
                  fill
                />
              </button>
            );
          })
        }
      </div>
    </div>
  );
};
