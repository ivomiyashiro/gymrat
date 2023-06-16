import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { createGalleryClassName } from '@/utils';

interface Props {
  productTitle: string;
  images?: string[];
  handleOpenModal: Dispatch<SetStateAction<{
    open: boolean;
    slide: number | null;
  }>>;
}

export const DesktopGallery = ({ productTitle, images, handleOpenModal }: Props) => {
  return (
    <div className='hidden md:flex flex-wrap w-full h-full'>
      {
        images?.map((image, i) => {
          let className = 'min-w-full mb-[0.19rem] px-[0.3129rem]';

          if (images.length === 3) {
            if (i === 0) {
              className = 'md:min-w-full mb-[0.19rem] px-[0.3129rem]';
            }
        
            if (i === 1 || i === 2) {
              className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
            }
          }
        
          if (images.length === 4) {
            if (i === 0 || i === 2) {
              className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] ml-0 mx-[0.3129rem] mb-[0.19rem]';
            }
        
            if (i === 1 || i === 3) {
              className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
            }
          }
        
          if (images.length === 5) {
            if (i === 0) {
              className = 'order-4 md:min-w-full mb-[0.19rem] px-[0.3129rem]';
            }
        
            if (i === 1 || i === 2) {
              className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
            }
        
            if (i === 3 || i === 4) {
              className = 'order-5 max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
            }
          }
        
          if (images.length === 6) {
            if (i === 0) {
              className = 'order-4 md:min-w-full mb-[0.19rem] px-[0.3129rem]';
            }
        
            if (i === 1 || i === 2 || i === 3) {
              className = 'max-w-[calc(33.33%-0.625rem)] flex-[1_1_33.33%] mx-[0.3129rem] mb-[0.19rem]';
            }
        
            if (i === 4 || i === 5) {
              className = 'order-5 max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mb-[0.625rem] mx-[0.3129rem]';
            }
          }

          return (
            <div key={ i } className={ className }>
              <button 
                className='relative pt-[119.5%] md:h-auto w-full overflow-hidden rounded-xl cursor-zoom-in'
                onClick={ () => handleOpenModal({ open: true, slide: i }) }
              >
                <Image
                  alt={ productTitle + '-' + i }
                  src={ image }
                  sizes='(min-width: 768px) 750px, 19vw'
                  quality={ 100 }
                  fill
                />
              </button>
            </div>
          );
        })
      }
    </div>
  );
};
