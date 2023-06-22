import { ChangeEvent, useContext } from 'react';
import Link from 'next/link';
import { ClipboardCheck, NavArrowLeft, NavArrowRight } from 'iconoir-react';

import { CheckoutContext } from '@/context';

import { Input, Spinner } from '@/components/ui';

export const Payment = () => {
  const {
    loading,
    paymentError,
    payment,
    handlePaymentSubmit,
    handleCardNumberChange,
    handleNameOnCard,
    handleExpirationDateChange,
    handleExpirationDateKeyDown,
    handleCVV,
    randomAutoFillPayment
  } = useContext(CheckoutContext);

  return (
    <form onSubmit={ handlePaymentSubmit }> 
      <div className='flex items-center justify-between mt-8'>
        <h3 className='font-semibold text-lg mb-3'>PAYMENT</h3>
        <button
          type='button'
          className='flex items-center gap-2 underline text-blue-600 text-sm'
          onClick={ randomAutoFillPayment }>
          <ClipboardCheck fontSize={ 12 } />
            Quick random autofill
        </button>
      </div>
      <Input
        label='Card Number'
        placeholder='Card number...'
        type='text'
        value={ payment.cartNumber }
        onChange={ handleCardNumberChange }
      />
      <div className='mt-3'>
        <Input 
          label='Name On Card'
          placeholder='Name on card...'
          type='text'
          value={ payment.nameOnCard }
          onChange={ (e: ChangeEvent<HTMLInputElement>) => handleNameOnCard(e.target.value) }
        />
      </div>
      <div className='mt-3 flex gap-3'>
        <Input 
          label='Expiration Date'
          placeholder='Expiration date (MM/YY)...'
          type='text'
          value={ payment.expDate }
          maxLength={ 5 }
          onChange={ handleExpirationDateChange }
          onKeyDown={ handleExpirationDateKeyDown }
        />
        <Input 
          label='Security Code'
          placeholder='Security code...'
          type='text'
          value={ payment.cvv }
          maxLength={ 3 }
          onChange={ (e: ChangeEvent<HTMLInputElement>) => handleCVV(e.target.value) }
        />
      </div>
      {
        paymentError
        &&
        <p className='text-red-500 text-sm mt-8'>{ paymentError }</p>
      }
      <div className='mt-8 flex justify-between'>
        <Link href='/cart/checkout?step=1' className='text-sm flex gap-2 items-center'>
          <NavArrowLeft width={ 16 } height={ 16 } />
          Return to shipping
        </Link>
        <button type='submit' className='bg-blue-600 font-semibold text-white p-3 px-6 rounded flex items-center gap-2 text-sm'>
          {
            loading
              ? <Spinner />
              : (
                <>
                  CONFIRM PURCHASE
                  <NavArrowRight width={ 16 } height={ 16 } />
                </>
              )
          }
        </button>
      </div>
    </form>
  );
};
