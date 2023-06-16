import { FormEvent, useContext, useState } from 'react';  
import { IProduct, TProductSize, TVariant } from '@/interfaces';
import { CartContext } from '@/context';

interface Props {
  product: IProduct;
  variant: TVariant;
}

export const useColorAndSizeForm = ({ product, variant }: Props) => {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState<TProductSize | null>();
  const [formError, setFormError] = useState<{ error: boolean; msg: string }>({ error: false, msg: '' });
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSize) {
      return setFormError({ error: true, msg: 'Please select a size.' });
    }

    setFormError({ error: false, msg: '' });
    addToCart({ 
      ...product, 
      featImageUrl: variant.images[0],
      quantity: 1,
      variant: product.variants.filter(vari => vari.color === variant.color && vari.size === selectedSize)[0]
    });
  };

  return {
    formError,
    selectedSize, 
    handleSubmit,
    handleError: setFormError,
    handleSelectedSize: setSelectedSize,
  };
};
