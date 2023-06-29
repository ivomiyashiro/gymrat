'use client';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const FadeUpContainer = ({ children, className }: Props) => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);


  return (
    <div className={ className + ` transition duration-500 ${ visible ? 'translate-y-none opacity-100' : 'translate-y-[100px] opacity-0'}` }>
      { children }
    </div>
  );
};
