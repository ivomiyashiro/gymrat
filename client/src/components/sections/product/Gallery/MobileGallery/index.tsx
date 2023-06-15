import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs as ThumbsModule } from 'swiper';

import { NavButton } from './NavButton';
import { Thumbs } from './Thumbs';

import 'swiper/swiper.min.css';

interface Props {
  productTitle: string;
  images?: string[];
  handleOpenModal: Dispatch<SetStateAction<{
    open: boolean;
    slide: number | null;
  }>>;
}

export const MobileGallery = ({ productTitle, images, handleOpenModal }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  return (
    <div className='md:hidden overflow-hidden'>
      <Swiper
        loop={ true }
        modules={ [ThumbsModule, Navigation] }
        thumbs={ { swiper: thumbsSwiper } }
        onSlideChange={ (swiper) => setActiveThumb(swiper.realIndex) }
        onSlideChangeTransitionStart={ () => setAnimationStarted(true) }
        onSlideChangeTransitionEnd={ () => setAnimationStarted(false) }
        className="h-full w-full relative !flex items-center"
      >
        {
          images?.map((image, i) => (
            <SwiperSlide key={ i } className='overflow-hidden pt-[119.5%] relative'>
              <button 
                className='absolute w-screen z-1 top-0 cursor-zoom-in h-full p-0' 
                onClick={ () => handleOpenModal({ open: true, slide: i }) }
              >
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
        <NavButton 
          type='RIGHT' 
          disabled={ animationStarted }
        />
        <NavButton 
          type='LEFT' 
          disabled={ animationStarted }
        />
      </Swiper>
      <Thumbs 
        activeThumb={ activeThumb }
        images={ images }
        productTitle={ productTitle }
        handleThumbsSwiper={ setThumbsSwiper }
      />
    </div>
  );
};
