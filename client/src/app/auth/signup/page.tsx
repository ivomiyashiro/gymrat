'use client';
import { FormEvent } from 'react';
import Image from 'next/image';

export default function Signup() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  return (
    <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-semibold text-sm'>Full name</label>
        <input type="text" className='w-full border h-12 text-md rounded px-3' placeholder='Enter your full name...' />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-semibold text-sm'>Enter email</label>
        <input type="email" className='w-full border h-12 text-md rounded px-3' placeholder='Enter your email...' />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-semibold text-sm'>Password</label>
        <input type="password" className='w-full border h-12 text-md rounded px-3' placeholder='Enter your password...' />
      </div>
      <button className='w-full bg-blue-600 h-12 text-white rounded mt-8 font-semibold hover:scale-95 transition-transform'>
          SIGN UP
      </button>
      <button className='w-full border h-12 rounded font-semibold flex items-center gap-3 justify-center hover:scale-95 transition-transform'>
        <Image 
          src='/images/google-logo.png'
          alt='google-logo'
          width={ 30 }
          height={ 30 }
        />
          Sign in with Google
      </button>
    </form>
  );
}
