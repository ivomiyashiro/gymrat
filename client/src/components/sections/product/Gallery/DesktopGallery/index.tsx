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
    <div className='hidden md:flex flex-wrap w-full'>
      {
        images?.map((image, i) => {
          const className = createGalleryClassName(images.length, i);

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
