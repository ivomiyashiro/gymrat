import Image from 'next/image';
import { useSwiper } from 'swiper/react';

interface Props {
  productTitle: string;
  index: number;
  image: string;
}

export const Slide = ({ productTitle, index, image }: Props) => {
  const swiper = useSwiper();

  const handleWheelEvent = (e: any) => {
    if (e.deltaY > 0) {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  };

  return (
    <div 
      className='relative h-full w-full flex justify-center text-center items-center'
      onWheel={ handleWheelEvent }
    >
      <Image
        alt={ productTitle + '-' + index }
        src={ image }
        sizes='(min-width: 768px) 750px, 19vw'
        width={ 0 }
        height={ 0 }
        style={ 
          { width: '100%', height: 'auto' } 
        }
      />
    </div>
  );
};
