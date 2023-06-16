import { Dispatch, SetStateAction } from 'react';
import { IProduct, TProductSize } from '@/interfaces';
import { getProductColorSizes } from '@/utils';

interface Props {
  product: IProduct;
  variantColor: string;
  selectedSize: TProductSize | null | undefined;
  formError: { error: boolean; msg: string };
  handleFormError: Dispatch<SetStateAction<{ error: boolean; msg: string }>>;
  handleSelectedSize: Dispatch<SetStateAction<TProductSize | null | undefined>>;
}

export const Sizes = ({ 
  product, 
  variantColor,
  selectedSize,
  formError,
  handleFormError,
  handleSelectedSize 
}: Props) => {
  const sizes = getProductColorSizes(product, variantColor);

  const handleClick = (size: TProductSize) => {
    handleSelectedSize(size);
    handleFormError({ error: false, msg: '' });
  };

  return (
    <>
      {
        sizes.length > 1
        &&
        <div className='mt-4 lg:mt-6'>
          <h3 className='font-semibold'>
            SELECT SIZE
          </h3>
          <div className='flex flex-wrap w-full gap-1 mt-3'>
            {
              sizes.map(variant => {
                return (
                  <button
                    key={ variant._id } 
                    type='button'
                    className={ `relative flex-1 h-12 border rounded transition border-black outline-none ${ selectedSize === variant.size ? 'bg-black text-white' : 'bg-white'} ${ variant.inventory <= 0 ? '!bg-gray-200 text-gray-500 opacity-30' : 'hover:bg-black hover:text-white hover:shadow-md' }` }
                    disabled={ variant.inventory <= 0 }
                    onClick={ () => handleClick(variant.size) }
                  >
                    { variant.size }
                  </button>
                );
              })
            }
          </div>
          { formError.error && <p className='mt-3 text-red-500 text-sm'>* { formError.msg }</p> }
        </div>
      }
    </>
  );
};
