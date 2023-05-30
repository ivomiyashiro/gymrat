import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  children: ReactNode;
}

export const DesktopNavItems = ({ href, children }: Props) => {
  return (
    <li className='h-full'>
      <Link href={ href } className='uppercase font-semibold relative before:content-[""] before:left-1/2 before:absolute before:bottom-0 before:w-0 before:h-[3px] before:bg-blue-600 hover:before:w-full hover:before:left-0 before:transition-all h-full flex items-center'>
        { children }
      </Link> 
    </li>
  );
};
