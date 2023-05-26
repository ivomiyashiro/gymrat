import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  withBackground?: boolean;
  className?: string;
  handleOpen: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({ children, isOpen, align = 'center', justify = 'center', withBackground = false, className, handleOpen }: Props) => {
  return (
    <div className={ `fixed top-0 left-0 flex h-screen overflow-hidden z-50 items-${ align } justify-${ justify } ${ isOpen ? 'w-full' : 'w-0'} ${ className }` }>
      <div className='relative z-30 top-0'>{ children }</div>
      <div className={ `h-full w-full absolute ${ isOpen ? 'block' : 'hidden'} ${ withBackground && 'bg-[hsla(0,0%,7%,.36)] backdrop-blur-sm'}` } onClick={ () => handleOpen(false) } />
    </div>
  );
};
