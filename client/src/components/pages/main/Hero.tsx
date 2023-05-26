import Image from 'next/image';

export const Hero = () => {
  return (
    <div className='relative top-0 w-full h-[calc(100vh-102px)] max-h-[770px]'>
      <Image
        src='/images/hero.jpg'
        alt='Gymrat hero image'
        style={ {
          objectFit: 'cover'
        } }
        fill
      />
    </div>
  );
};
