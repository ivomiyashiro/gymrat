'use client';
import { useState } from 'react';

import { MobileGallery } from './MobileGallery';
import { DesktopGallery } from './DesktopGallery';
import { ScreenGallery } from './ScreenGallery';

interface Props {
  productTitle: string;
  images?: string[];
}

export const Gallery = ({ productTitle, images }: Props) => {
  const [screenGallery, setScreenGallery] = useState<{ open: boolean; slide: number | null}>({ 
    open: false,
    slide: null 
  });

  return (
    <div className='md:flex-[1_1] md:mr-[3rem]'>
      <MobileGallery
        productTitle={ productTitle }
        images={ images }
        handleOpenModal={ setScreenGallery }
      />
      <DesktopGallery 
        productTitle={ productTitle }
        images={ images }
        handleOpenModal={ setScreenGallery }
      />
      <ScreenGallery
        images={ images }
        open={ screenGallery.open }
        initialSlide={ screenGallery.slide }
        productTitle={ productTitle }
        handleOpenModal={ setScreenGallery }
      />
    </div>
  );
};
