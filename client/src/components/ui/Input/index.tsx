import { ChangeEvent, KeyboardEvent, useId } from 'react';

interface Props {
  value :string;
  placeholder: string;
  type: string;
  label: string;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, placeholder, type, label, maxLength, onChange, onKeyDown }: Props) => {
  const id = useId();

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label htmlFor={ id } className='font-semibold text-sm'>{ label }</label>
      <input 
        type={ type }
        id={ id }
        value={ value }
        placeholder={ placeholder }
        maxLength={ maxLength }
        onChange={ onChange }
        onKeyDown={ onKeyDown }
        className='w-full border h-12 text-md rounded px-3'
      />
    </div>
  );
};
