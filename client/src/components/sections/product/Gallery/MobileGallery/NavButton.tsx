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
      className={ `absolute z-10 bg-white shadow rounded-full w-7 h-7 flex items-center justify-center ${ type === 'LEFT' ? 'left-4' : 'right-4'}` }
      onClick={ type === 'LEFT' ? handleNavLeft : handleNavRight }
    >
      {
        type === 'LEFT'
          ? <NavArrowLeft width={ 20 } height={ 20 } />
          : <NavArrowRight width={ 20 } height={ 20 } />
      }

    </button>
  );
};
