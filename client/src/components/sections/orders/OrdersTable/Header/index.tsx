'use client';
import { Dispatch, SetStateAction } from 'react';
import { EyeAlt } from 'iconoir-react';

import { InputSelect } from '@/components/ui';

import { Searchbar } from './Searchbar';

interface Props {
  searchText: string;
  handleSearchText: Dispatch<SetStateAction<string>>;
  handleLimit: Dispatch<SetStateAction<number>>
}

export const Header = ({ searchText, handleSearchText, handleLimit }: Props) => {
  return (
    <div className='flex gap-4'>
      <Searchbar inputValue={ searchText } handleInputValue={ handleSearchText } />
      <InputSelect
        icon={ <EyeAlt /> }
        name="orders-limit"
        values={ ['5', '10', '15', '20'] }
        onChange={ handleLimit }
      />
    </div>
  );
};
