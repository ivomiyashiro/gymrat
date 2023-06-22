'use client';
import { useSearchParams } from 'next/navigation';

import { GymratLogo } from '@/components/svgs';
import { Payment, Shipping } from '@/components/sections/checkout';

export default function Checkout() {
  const searchParams = useSearchParams();

  return (
    <section className='w-full h-full'>
      <div>
        <div className='hidden lg:flex justify-center items-center mt-[4em]'>
          <GymratLogo width={ 60 } height={ 50 } />
        </div>
        <div className='p-4 pt-6 lg:max-w-[600px] mx-auto'>
          {
            searchParams.get('step') === '1'
              ? <Shipping />
              : <Payment />
          }
        </div>
      </div>
    </section>
  );
};
