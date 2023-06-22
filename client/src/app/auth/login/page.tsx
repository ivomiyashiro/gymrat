'use client';
import { ChangeEvent } from 'react';
import Image from 'next/image';

import { getGoogleOAuthURL } from '@/utils';
import { useLoginForm } from './useLoginForm';

import { Spinner } from '@/components/ui';
import { Input } from '@/components/ui/Input';

export default function Login() {

  const { 
    emailValue, 
    passwordValue,
    error,
    loading,
    handlePasswordValue,
    handleEmailValue,
    handleSubmit,
  } = useLoginForm();

  const googleOAuthUrl = getGoogleOAuthURL();

  return (
    <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
      <Input 
        label='Enter email'
        placeholder='Enter your email...'
        type='email'
        value={ emailValue }
        onChange={ (e: ChangeEvent<HTMLInputElement>) => handleEmailValue(e.target.value) }
      />
      <Input 
        label='Password'
        placeholder='Enter your password...'
        type='password'
        value={ passwordValue }
        onChange={ (e: ChangeEvent<HTMLInputElement>) => handlePasswordValue(e.target.value) }
      />
      {
        error
        &&
        <p className='text-sm text-red-500'>{ error }</p>
      }
      <button className='w-full bg-blue-600 h-12 text-white flex justify-center items-center rounded mt-8 font-semibold hover:scale-95 transition-transform'>
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
