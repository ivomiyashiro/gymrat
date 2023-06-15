import { useSwiper } from 'swiper/react';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

interface Props {
  type: 'LEFT' | 'RIGHT';
  disabled: boolean;
}

export const NavButton = ({ type, disabled }: Props) => {
  const swiper = useSwiper();

  const handleNavLeft = () => swiper.slidePrev();

  const handleNavRight = () => swiper.slideNext();

  return (
    <button 
      disabled={ disabled }
      className={ `absolute z-10 bg-white shadow-xl rounded-full w-10 h-10 hidden lg:flex items-center justify-center ${ type === 'LEFT' ? 'left-4' : 'right-4'}` }
      onClick={ type === 'LEFT' ? handleNavLeft : handleNavRight }
    >
      {
        type === 'LEFT'
          ? <NavArrowLeft width={ 30 } height={ 30 } />
          : <NavArrowRight width={ 30 } height={ 30 } />
      }

    </button>
  );
};
