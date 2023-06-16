'use client';
import { Cancel, CheckCircle } from 'iconoir-react';
import { useToastContainer } from './useToastContainer';

export const ToastContainer = () => {
  const { toast, show, handleCloseToast } = useToastContainer();

  return (
    <div className={ `fixed flex justify-center w-full px-4 transition-all duration-300 ${show ? 'opacity-100 bottom-6 ' : 'opacity-0 -bottom-96'}` }>
      {toast && (
        <div className="relative bg-green-400 text-white px-6 py-4 pl-6 pr-16 rounded flex gap-10 shadow-xl">
          <div className="flex items-center gap-3">
            <CheckCircle color='white' width={ 28 } height={ 28 } />
            <div>
              <h3 className='font-semibold'>{ toast?.title }</h3>
              <p className='text-sm'>{ toast?.content }</p>
            </div>
          </div>
          <button className="absolute top-2 right-2 p-1" onClick={ handleCloseToast }>
            <Cancel width={ 18 } height={ 18 } />
          </button>
        </div>
      )}
    </div>
  );
};
