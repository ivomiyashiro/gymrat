import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks';

import { IProduct } from '@/interfaces';

const API_BASE_URL = process.env.API_BASE_URL;

interface Props {
  open: boolean;
  inputValue: string;
}

export const useSearchMenu = ({ open, inputValue }: Props) => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  
  useEffect(() => {
    if (inputValue !== '') {
      setLoading(true);
    }
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue === '') {
      return setProducts([]);
    }; 
    
    const searchProduct = async () => {
      const resp = await fetch(API_BASE_URL + `/products?search=${ debouncedValue }`);
      const { ok, products } = await resp.json() as { ok: boolean, products: IProduct[] };

      if (!ok) return;

      setProducts(
        // Filter product variants to get just one color for each variant
        products.map(product => {
          let colors: string[] = [];
          return {
            ...product,
            variants: product.variants.filter(variant => {
              if (!(colors.includes(variant.color))){
                colors = [ ...colors, variant.color ];
                return variant;
              }
            })
          };
        })
      );

      setLoading(false);
    };

    searchProduct();

  }, [debouncedValue]);

  return {
    loading,
    inputRef,
    inputValue,
    products,
    focus,
    handleFocus: setFocus
  };

};
