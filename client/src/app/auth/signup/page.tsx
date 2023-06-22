'use client';
import { ChangeEvent } from 'react';
import Image from 'next/image';

import { getGoogleOAuthURL } from '@/utils';
import { useSigninForm } from './useSigninForm';

import { Spinner, Input } from '@/components/ui';

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
      <Input 
        label='Full name'
        placeholder='Enter your name...'
        type='text'
        value={ nameValue }
        onChange={ (e: ChangeEvent<HTMLInputElement>) => handleNameValue(e.target.value) }
      />
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
