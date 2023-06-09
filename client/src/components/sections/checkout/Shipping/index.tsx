import { ChangeEvent, useContext } from 'react';
import { CheckoutContext } from '@/context';
import { Input } from '@/components/ui';
import { ClipboardCheck, NavArrowRight } from 'iconoir-react';

export const Shipping = () => {
  const {
    shippingError,
    shippingInfo,
    handleShippingSubmit,
    handleCity,
    handleAdress,
    handleLocality,
    handleZip,
    handlePhoneNumber,
    randomAutoFillShipping
  } = useContext(CheckoutContext);

  return (
    <form onSubmit={ handleShippingSubmit }>
      <div className='mt-8'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-lg mb-3'>SHIPPING ADDRESS</h3>
          <button
            type='button'
            className='flex items-center gap-2 underline text-blue-600 text-sm'
            onClick={ randomAutoFillShipping }>
            <ClipboardCheck fontSize={ 12 } />
            Quick random autofill
          </button>
        </div>
        <div>
          <Input
            label='City'
            placeholder='Enter you name...'
            type='text'
            value={ shippingInfo.city }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleCity(e.target.value) }
          />
        </div>
        <div className='mt-3'>
          <Input 
            label='Locality'
            placeholder='Enter you city...'
            type='text'
            value={ shippingInfo.locality }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleLocality(e.target.value) }
          />
        </div>
        <div className='mt-3 flex gap-3'>
          <Input 
            label='Address'
            placeholder='Enter you address...'
            type='text'
            value={ shippingInfo.address }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleAdress(e.target.value) }
          />
        </div>
        <div className='w-full flex gap-3 mt-3'>
          <Input 
            label='Zip Code'
            placeholder='Enter you zip...'
            type='text'
            value={ shippingInfo.zip }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handleZip(e.target.value) }
          />
          <Input 
            label='Phone'
            placeholder='Enter you phone...'
            type='text'
            value={ shippingInfo.phoneNumber }
            onChange={ (e: ChangeEvent<HTMLInputElement>) => handlePhoneNumber(e.target.value) }
          />
        </div>
      </div>
      {
        shippingError
        &&
        <p className='text-red-500 text-sm mt-8'>{ shippingError }</p>
      }
      <div className='mt-8 flex justify-end'>
        <button type='submit' className='bg-blue-600 font-semibold text-white p-3 px-6 rounded flex items-center gap-2 text-sm'>
          COUNTINUE TO PAYMENT
          <NavArrowRight width={ 16 } height={ 16 } />
        </button>
      </div>
      <div className='mt-10'>
        <p className='text-sm text-gray-400'>
          * NOTE: This is only an academic project, it is not necessary to complete the fields with real data.
        </p>
      </div>
    </form>
  );
};
