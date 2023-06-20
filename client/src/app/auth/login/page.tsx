'use client';
import { FormEvent } from 'react';
import Image from 'next/image';
import { getGoogleOAuthURL } from '@/utils';

export default function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
      <div className='flex flex-col gap-1'>
        <label htmlFor="login-email" className='font-semibold text-sm'>Enter email</label>
        <input type="email" id='login-email' className='w-full border h-12 text-md rounded px-3' placeholder='Enter your email...' />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="login-password" className='font-semibold text-sm'>Password</label>
        <input type="password" id='login-password' className='w-full border h-12 text-md rounded px-3' placeholder='Enter your password...' />
      </div>
      <button className='w-full bg-blue-600 h-12 text-white rounded mt-8 font-semibold hover:scale-95 transition-transform'>
        LOG IN
      </button>
      <a href={ getGoogleOAuthURL() } className='w-full border h-12 rounded font-semibold flex items-center gap-3 justify-center hover:scale-95 transition-transform'>
        <Image 
          src='/images/google-logo.png'
          alt='google-logo'
          width={ 30 }
          height={ 30 }
        />
          Sign in with Google
      </a>
    </form>
  );
}
