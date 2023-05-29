import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Cancel, NavArrowLeft, Search } from 'iconoir-react';

import { IProduct } from '@/interfaces';

import { useDebounce } from '@/hooks';

import { Modal } from '../../Modal';
import { ProductCard } from '../../ProductCard';

interface Props {
  open: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>
}

const TRENDING_SEARCHES = ['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS'];
const API_BASE_URL = process.env.API_BASE_URL;

export const SearchMenu = ({ open, handleOpen }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFocus, setFocus] = useState(false);
  let productPrints = 0;
  
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

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
                colors = [...colors, variant.color];
                return variant;
              }
            })
          };
        })
      );
    };

    searchProduct();

  }, [debouncedValue]);

  return (
    <>
      <Modal isOpen={ open } handleOpen={ handleOpen } withBackground justify='start'>
        <aside className={ `fixed top-0 h-screen bg-white overflow-scroll transition-all lg:h-auto scrollbar-hidden ${ open ? 'w-full' : 'w-0'}` }>
          <div className='p-4 flex items-center gap-4 lg:justify-center lg:border-b'>
            <button className='lg:hidden' onClick={ () => handleOpen(false) }>
              <NavArrowLeft width={ 38 } height={ 38 } />
            </button>
            <div className={ `w-full bg-gray-100 hover:bg-gray-200 flex items-center p-3 rounded-md gap-2 border lg:w-[400px] lg:ml-auto ${ isFocus ? 'border-black bg-gray-200' : 'border-transparent'}` }>
              <Search width={ 25 } height={ 25 } />
              <input 
                type="text" 
                placeholder='Try a product or color'
                className='bg-transparent outline-none w-full text-sm'
                ref={ inputRef }
                value={ inputValue }
                onChange={ (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value) }
                onFocus={ () => setFocus(true) }
                onBlur={ () => setFocus(false) }
              />
            </div>
            <button className='hidden lg:block lg:ml-auto' onClick={ () => handleOpen(false) }>
              <Cancel width={ 38 } height={ 38 } />
            </button>
          </div>
          {
            products.length > 0
              ? (
                <div className='p-4 max-w-[975px] mx-auto'>
                  <p className='block lg:border-b font-semibold lg:pb-2'>PRODUCTS</p>
                  <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 gap-y-6 my-4 overflow-hidden'>
                    {
                      products.map(({ title, discountPrice, fitType, price, variants }, i) => {
                        if (productPrints < 6) {
                          return (
                            variants.map(({ _id, color, images, slug }, i) => {
                              if (i < 6) {
                                productPrints += 1;
                                return (
                                  <ProductCard
                                    key={ _id } 
                                    title={ title }
                                    discountPrice={ discountPrice }
                                    featImageUrl={ images[0] }
                                    fitType={ fitType }
                                    price={ price }
                                    color={ color }
                                    slug={ slug }
                                  /> 
                                );
                              }
                            })
                          );
                        }
                      })
                    }
                  </div>
                  {
                    products.length < 6
                    &&
                    <div className='py-4 border-t flex justify-end mt-10 lg:mt-4'>
                      <Link href={ `/products?search=${ inputValue }` }>
                        View all &quot;<span className='font-semibold underline'>{ inputValue }</span>&quot;
                      </Link>
                    </div>
                  }
                </div>
              )
              : (
                <div className='p-4 max-w-[900px] mx-auto'>
                  <p className='font-semibold'>TREANDING SEARCHES</p>
                  <div className='mt-4 flex overflow-x-scroll scrollbar-hidden pb-4'>
                    <ul className='flex gap-2'>
                      {
                        TRENDING_SEARCHES.map(( trendingSearch, i) => (
                          <li key={ i }>
                            <Link href={ `products?search=${ trendingSearch }` } className='bg-gray-100 py-1 px-3 text-xs whitespace-nowrap rounded-md'>
                              { trendingSearch }
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              )
          }
        </aside>
      </Modal>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `} 
      </style>
    </>
  );
};
