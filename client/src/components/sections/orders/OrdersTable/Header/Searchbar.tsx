import { Dispatch, SetStateAction } from 'react';

interface Props {
  inputValue: string;
  handleInputValue: Dispatch<SetStateAction<string>>;
}

export const Searchbar = ({ inputValue, handleInputValue }: Props) => {
  return (
    <div className='w-full border rounded flex items-center px-4'>
      <div className='w-full'>
        <input
          type="text"
          placeholder="Try an order number..."
          className='w-full outline-none'
          value={ inputValue }
          onChange={ (e) => handleInputValue(e.target.value) }
        />
      </div>
    </div>
  );
};
