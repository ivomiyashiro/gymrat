import { Minus, Plus } from 'iconoir-react';
import { useState } from 'react';

interface Props {
  description: string;
}

export const ProductDescription = ({ description }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='mt-8'>
      <details className='border-t border-b p-4' onClick={ () => setOpen(prev => !prev) } open>
        <summary className='flex justify-between cursor-pointer'>
          <h5 className='font-semibold'>DESCRIPTION</h5>
          {
            open
              ? <Minus />
              : <Plus />
          }
        </summary>
        <div className='pt-4'>
          <p className='text-sm text-gray-500'>{ description }</p>
        </div>
      </details>
    </div>
  );
};
