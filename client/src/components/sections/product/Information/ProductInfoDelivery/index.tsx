import { DeliveryTruck, Refresh } from 'iconoir-react';

export const ProductInfoDelivery = () => {
  return (
    <div className='mt-10'>
      <h5 className='font-semibold'>DELIVERED TO YOUR DOOR</h5>
      <div className='rounded p-4 mt-3 bg-gray-100 flex flex-col gap-6'>
        <div className='flex gap-3 items-start'>
          <div className='bg-green-200 h-10 w-10 flex items-center justify-center rounded'>
            <Refresh strokeWidth='2.3' fontSize={ 13 } className='text-green-800'/>
          </div>
          <div className='flex flex-col gap-[0.1em]'>
            <p className='text-sm'>Free 30-Day Return Policy!</p>
            <p className='text-xs text-blue-500 hover:underline cursor-pointer'>More info.</p>
          </div>
        </div>
        <div className='flex gap-3 items-start'>
          <div className='bg-orange-200 h-10 w-10 flex items-center justify-center rounded'>
            <DeliveryTruck strokeWidth='2.3' fontSize={ 16 } className='text-orange-800'/>
          </div>
          <div className='flex flex-col gap-[0.1em]'>
            <p className='text-sm'>Free Shipping For All Products </p>
            <p className='text-xs text-blue-500 hover:underline cursor-pointer'>More info.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
