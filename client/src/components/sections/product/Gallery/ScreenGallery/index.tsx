import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import { Cancel } from 'iconoir-react';

import { Modal } from '@/components/ui';
import { NavButton } from './NavButton';

import 'swiper/css';
import 'swiper/css/scrollbar';
import { Slide } from './Slide';

interface Props {
  open: boolean;
  productTitle: string;
  images?: string[];
  initialSlide: number | null;
  handleOpenModal: Dispatch<SetStateAction<{
    open: boolean;
    slide: number | null;
  }>>;
}

export const ScreenGallery = ({ 
  productTitle, 
  images, 
  open, 
  initialSlide,
  handleOpenModal 
}: Props) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  return (
    <Modal open={ open } onClose={ () => handleOpenModal({ open: false, slide: null }) } withBackground >
      <button 
        className='absolute bg-white shadow top-4 right-4 z-10 h-10 w-10 rounded-full flex items-center justify-center'
        onClick={ () => handleOpenModal({ open: false, slide: null }) }
      >
        <Cancel width={ 30 } height={ 30 } />
      </button>
      { 
        open 
        && 
        <div className='relative w-screen max-w-[698px]  lg:h-screen overflow-hidden' >
          <Swiper
            loop={ true }
            scrollbar={ {
              hide: false,
            } }
            initialSlide={ initialSlide || 0 }
            modules={ [Navigation, Scrollbar] }
            onSlideChangeTransitionStart={ () => setAnimationStarted(true) }
            onSlideChangeTransitionEnd={ () => setAnimationStarted(false) }
            className="h-full relative !flex items-center !overflow-visible"
          >
            {
              images?.map((image, i) => (
                <SwiperSlide key={ i }>
                  <Slide 
                    index={ i }
                    productTitle={ productTitle }
                    image={ image }
                  />
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
        </div>
      }
    </Modal>
  );
};
