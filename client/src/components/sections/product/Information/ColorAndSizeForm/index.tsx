import { ShoppingBag } from 'iconoir-react';

import { IProduct, TVariant } from '@/interfaces';
import { useColorAndSizeForm } from './useColorAndSizeForm';

import { Colors } from './Colors';
import { Sizes } from './Sizes';

interface Props {
  product: IProduct;
  variant: TVariant;
}

export const ColorAndSizeForm = ({ product, variant }: Props) => {
  const {
    formError,
    selectedSize,
    handleSubmit,
    handleError,
    handleSelectedSize
  } = useColorAndSizeForm({ product, variant });

  
  return (
    <form className='mt-6' onSubmit={ handleSubmit }>
      <Colors
        product={ product }
        variant={ variant }
      />
      <Sizes 
        product={ product }
        variantColor={ variant.color }
        selectedSize={ selectedSize }
        formError={ formError }
        handleFormError={ handleError }
        handleSelectedSize={ handleSelectedSize }
      />
      <div className='mt-8'>
        <button 
          className='flex items-center gap-2 justify-center bg-blue-600 w-full text-white p-3 rounded hover:scale-95 transition'
        >
          <ShoppingBag fontSize={ 14 }/>
          <span className='font-semibold text-lg mt-[3px]'>ADD TO BAG</span>
        </button>
      </div>
    </form>
  );
};
