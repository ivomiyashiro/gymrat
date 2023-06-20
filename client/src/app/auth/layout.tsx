import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { checkToken } from '@/services';

import { GymratLogo } from '@/components/svgs';
import { RoutesButtons } from '@/components/sections';

export const metadata = { title: 'Account | Gymrat' };

export default async function Layout({ children }: { children: React.ReactNode }) {

  let user = null;
  const token = cookies().get('token');

  if (token) {
    user = await checkToken(token.value);
  } 

  if (user) redirect('/');

  return (
    <main className='flex justify-center h-screen'>
      <section className='w-[85%] hidden lg:flex h-full bg-red-500 bg-cover bg-center items-center lg:p-[2em] xl:p-[4em]' style={ {
        backgroundImage: 'url(\'https://cdn.develop.gymshark.com/auth-img.jpg\')'
      } }>
        <div>
          <h2 className='text-white font-semibold leading-[1.15em]'>TRACK YOUR ORDERS</h2>
          <p className='mt-2 text-white'>Keep track the status of your orders and more!</p>
        </div>
      </section>
      <section className='w-full pt-[5rem] px-4 lg:pt-[7rem] flex justify-center'>
        <div className='w-[375px]'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <Link href='/'>
              <GymratLogo color='black' width={ 64 } height={ 50 }/>
            </Link>
            <h1 className='text-2xl font-semibold'>MY GYMRAT</h1>
          </div>
          <RoutesButtons />
          { children }
        </div>
      </section>
    </main>
  );
}
