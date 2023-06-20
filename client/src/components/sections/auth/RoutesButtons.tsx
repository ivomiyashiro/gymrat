'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const RoutesButtons = () => {
  const pathname = usePathname();

  return (
    <div className='w-full flex mt-6 mb-10'>
      <Link href='/auth/login' className={ `p-3 border-b w-full text-center font-semibold text-sm ${ pathname.includes('login') ? 'border-black border-b-2' : ''}` }>
        LOG IN
      </Link>
      <Link href='/auth/signup' className={ `p-3 border-b w-full text-center font-semibold text-sm ${ pathname.includes('signup') ? 'border-black border-b-2' : ''}` }>
        SIGN UP
      </Link>
    </div>
  );
};
