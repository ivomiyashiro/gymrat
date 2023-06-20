'use client';
import { ChangeEvent } from 'react';
import Image from 'next/image';

import { getGoogleOAuthURL } from '@/utils';
import { useSigninForm } from './useSigninForm';

import { Spinner } from '@/components/ui';

export default function Signup() {

  const {
    nameValue,
    emailValue, 
    passwordValue,
    error,
    loading,
    handleNameValue,
    handlePasswordValue,
    handleEmailValue,
    handleSubmit,
  } = useSigninForm();

  const googleOAuthUrl = getGoogleOAuthURL();
  
  return (
    <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-semibold text-sm'>Full name</label>
        <input 
          type="text"
          id='signup-name'
          value={ nameValue }
          placeholder='Enter your name...' 
          className='w-full border h-12 text-md rounded px-3'
          onChange={ (e: ChangeEvent<HTMLInputElement>) => handleNameValue(e.target.value) }
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-semibold text-sm'>Email</label>
        <input 
          type="email"
          id='signup-email'
          value={ emailValue }
          className='w-full border h-12 text-md rounded px-3' 
          placeholder='Enter your email...' 
          onChange={ (e: ChangeEvent<HTMLInputElement>) => handleEmailValue(e.target.value) }
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-semibold text-sm'>Password</label>
        <input 
          type="password"
          id='signup-password'
          value={ passwordValue }
          className='w-full border h-12 text-md rounded px-3' 
          placeholder='Enter your password...' 
          onChange={ (e: ChangeEvent<HTMLInputElement>) => handlePasswordValue(e.target.value) }
        />
      </div>
      {
        error
        &&
        <p className='text-sm text-red-500'>{ error }</p>
      }
      <button className='w-full bg-blue-600 h-12 text-white rounded mt-8 font-semibold hover:scale-95 transition-transform flex items-center justify-center'>
        {
          loading
            ? <Spinner />
            : 'LOG IN'
        }
      </button>
      <a href={ googleOAuthUrl } className='w-full border h-12 rounded font-semibold flex items-center gap-3 justify-center hover:scale-95 transition-transform'>
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
