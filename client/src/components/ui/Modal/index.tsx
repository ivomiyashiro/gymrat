'use client';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
  open: boolean;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  withBackground?: boolean;
  className?: string;
  onClose: () => void;
}

export const Modal = ({ children, open, align = 'center', justify = 'center', withBackground = false, className, onClose }: Props) => {

  useEffect(() => {
    if (open) {
      return document.body.classList.add('overflow-hidden');
    }

    document.body.classList.remove('overflow-hidden');

  }, [open]);

  return (
    <div className={ `fixed top-0 left-0 flex h-screen overflow-hidden z-50 items-${ align } justify-${ justify } ${ open ? 'w-full' : 'w-0'} ${ className }` }>
      <div className='relative z-30 top-0'>{ children }</div>
      <div className={ `h-full w-full absolute ${ open ? 'block' : 'hidden'} ${ withBackground && 'bg-[hsla(0,0%,7%,.36)] backdrop-blur-sm'}` } onClick={ onClose } />
    </div>
  );
};
