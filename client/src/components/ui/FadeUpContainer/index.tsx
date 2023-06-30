'use client';
import { ReactNode, useEffect, useRef, useState, Children } from 'react';
import { useIntersectionObserver } from '@/hooks';

interface Props {
  index?: number;
  children: ReactNode;
  delayFactor?: number;
  className?: string;
}

export const FadeUpContainer = ({ index = 0, children, className, delayFactor = 0 }: Props) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {});

  useEffect(() => {
    if (entry?.isIntersecting) {
      setVisible(true);
    }
  }, [entry]);

  return (
    <>
      {Children.map(children, () => (
        <div
          ref={ ref }
          className={ `transition duration-500 delay-150 ${ className } ${visible ? 'opacity-100 translate-y-none' : 'opacity-0 translate-y-[100px]'}` }
          style={ {
            transitionDelay: `${delayFactor > 0 ? index * delayFactor + 'ms' : '0'}`,
          } }
        >
          { children }
        </div>
      ))}
    </>
  );
};
