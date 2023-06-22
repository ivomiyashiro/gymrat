'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {
        pathname.includes('auth') || pathname.includes('dashboard') || pathname.includes('checkout')
          ? <>{ children }</>
          : (
            <>
              <Header />
              { children }
              <Footer />
            </>
          )
      }
    </>
  );
};
