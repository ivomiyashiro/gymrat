'use client';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  icon: any;
  values: string[];
  name: string;
  id?: string;
  onChange: Dispatch<SetStateAction<number>>
}

export const InputSelect = ({ icon: Icon, values, name, id, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(values[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className='flex items-center border rounded'>
      <div className={ `w-full fixed bg-transparent left-0 top-0 h-screen z-40 ${ open ? 'block' : 'hidden'}` } onClick={ () => setOpen(false) }></div>
      <div className='p-2'>
        { Icon }
      </div>
      <div className='relative cursor-pointer'>
        <div className='flex items-center justify-center h-10 min-w-[80px] relative overflow-hidden cursor-pointer rounded' onClick={ () => setOpen(true) }>
          <select hidden name={ name } id={ id }>
            <option value={ inputValue }></option>
          </select>
          <div className='flex gap-2 items-center border-l cursor-pointer' onClick={ () => setOpen(true) }>
            <div className='flex h-10 items-center justify-center rounded relative overflow-hidden cursor-pointer'>
              <input
                type="text"
                value={ inputValue }
                autoComplete="none"
                className='border-none w-full bg-transparent text-center cursor-pointer'
                disabled
              />
            </div>
          </div>
        </div>
        <ul className={ `absolute top-[55px] right-0 w-full border rounded z-40 bg-white shadow ${ open ? 'block' : 'hidden' }` }>
          { values.map((value, i) => (
            <li
              className='p-2 hover:bg-gray-50 text-center cursor-pointer'
              key={ i }
              onClick={ () => { setInputValue(value); onChange(Number(value)); setOpen(false); } }
            >
              { value }
            </li>
          )) }
        </ul>
      </div>
    </div>
  );
};
