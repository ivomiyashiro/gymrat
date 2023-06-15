import { useContext, useState } from 'react';
import { NavArrowRight } from 'iconoir-react';
import { CatalogContext } from '@/context';

export const SortingMenuItem = () => {
  const { sortingOptions, handleSortingChange } = useContext(CatalogContext);
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full border-b'>
      <button className='flex w-full justify-between items-center py-5 outline-none' onClick={ () => setOpen(prev => !prev) }>
        <div className='flex gap-3'>
          <h3 className='uppercase font-semibold'>SORT BY</h3>
          <div className='flex items-center gap-2 mt-px'>
            {
              sortingOptions.map(val => (
                val.checked && (
                  <p key={ val.title } className='text-gray-400 text-sm'>{ val.title }</p>
                )
              ))
            }
          </div>
        </div>
        <div className={ `${ open ? 'rotate-90' : ''}` }>
          <NavArrowRight />
        </div>
      </button>
      <ul className={ `flex flex-col gap-3 w-full flex-wrap overflow-hidden transition ${open ? 'h-auto mb-4' : 'h-0 my-0'} ` }>
        {
          sortingOptions?.map(({ title, checked }, i: number) => {
            return (
              <li key={ i }>
                <label
                  htmlFor={ i.toString() + title } 
                  className='text-black inline-flex items-center gap-3 cursor-pointer'
                >
                  <input 
                    type="radio" id={ i.toString() + title } checked={ checked } value={ title } onChange={ () => handleSortingChange(i) } />
                  { title }
                </label>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
