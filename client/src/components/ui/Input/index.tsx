import { ChangeEvent, useId } from 'react';

interface Props {
  value :string;
  placeholder: string;
  type: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, placeholder, type, label, onChange }: Props) => {
  const id = useId();

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label htmlFor={ id } className='font-semibold text-sm'>{ label }</label>
      <input 
        type={ type }
        id={ id }
        value={ value }
        placeholder={ placeholder }
        className='w-full border h-12 text-md rounded px-3'
        onChange={ onChange }
      />
    </div>
  );
};
