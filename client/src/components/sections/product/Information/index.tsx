'use client';
import { IProduct, TVariant } from '@/interfaces';
import { MainInfo } from './MainInfo';
import { ColorAndSizeForm } from './ColorAndSizeForm';

interface Props {
  product: IProduct;
  variant: TVariant;
}

export const Information = ({ product, variant }: Props) => {
  return (
    <div className='md:w-[20.31rem] lg:w-[23.4375rem] mt-6 md:mt-0 px-4 md:px-0'>
      <MainInfo 
        category={ product.category }
        fitType={ product.fitType }
        price={ product.price }
        title={ product.title }
      />
      <ColorAndSizeForm product={ product } variant={ variant } />
      <div>

      </div>
    </div>
  );
};
