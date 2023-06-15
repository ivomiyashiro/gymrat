import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

interface Props {
  productTitle: string;
  activeThumb: number;
  images?: string[];
  handleThumbsSwiper: Dispatch<SetStateAction<any>>;
}

export const Thumbs = ({ productTitle, images, activeThumb, handleThumbsSwiper }: Props) => {
  return (
    <Swiper
      freeMode={ true }
      loop={ true }
      modules={ [ FreeMode ] }
      onSwiper={ handleThumbsSwiper }
      slidesPerView="auto"
      spaceBetween={ 4 }
      watchSlidesProgress={ true }
      className='w-full h-full mt-1 !ml-1'
    >
      {
        images?.map((image, i) => (
          <SwiperSlide key={ i } className={ `block relative transition p-0 aspect-[121/145] !w-[4.25rem] !h-[4.875rem] border ${ activeThumb === i ? 'border-black' : 'border-transparent' }` }>
            <button className='z-10 top-0 h-full w-full p-0'>
              <Image 
                alt={ productTitle + '-' + i }
                src={ image }
                sizes='(min-width: 768px) 1px, 100vw'
                fill
              />
            </button>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};
