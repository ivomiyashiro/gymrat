import { ChangeEventHandler, FocusEventHandler, ForwardedRef, MouseEventHandler } from 'react';
import { Cancel, Search } from 'iconoir-react';

import { Spinner } from '@/components/ui/Spinner';

interface Props {
  focus: boolean;
  reference: ForwardedRef<HTMLInputElement>;
  value: string;
  loading: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SearchbarInput = ({ focus, reference, value, loading, onChange, onFocus, onBlur, onClick }: Props) => {
  return (
    <div className={ `relative w-full bg-gray-100 hover:bg-gray-200 flex items-center p-3 rounded-md gap-2 border lg:w-[400px] ${ focus ? 'border-black bg-gray-200' : 'border-transparent'}` }>
      <Search width={ 25 } height={ 25 } />
      <input 
        type="text" 
        placeholder='Try a product or color'
        className='bg-transparent outline-none w-full text-sm'
        ref={ reference }
        value={ value }
        onChange={ onChange }
        onFocus={ onFocus }
        onBlur={ onBlur }
      />
      {
        loading
          ? <Spinner size='4' contrast />
          : (
            value.length > 0 
            && 
            <button className='absolute right-3 flex justify-center items-center bg-gray-400 w-4 h-4 rounded-full' onClick={ onClick }>
              <Cancel width={ 12 } height={ 12 } color='#fff'/>
            </button>
          )
      }
    </div>
  );
};
