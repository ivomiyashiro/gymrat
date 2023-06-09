import { useContext, useState } from 'react';
import { NavArrowRight } from 'iconoir-react';
import { CatalogContext } from '@/context';

interface Props {
  filterId: string;
  title: string;
  values: { _id: string; value: string; checked: boolean }[];
}

export const FiltersMenuItem = ({ filterId, title, values }: Props) => {
  const { toggleFilterCheckbox } = useContext(CatalogContext);
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full border-b'>
      <button className='flex w-full justify-between items-center py-5 outline-none' onClick={ () => setOpen(prev => !prev) }>
        <div className='flex gap-3'>
          <h3 className='uppercase font-semibold'>{ title === 'fitType' ? 'FIT' : title }</h3>
          <div className='flex items-center gap-2 mt-px'>
            {
              values.map(val => (
                val.checked && (
                  <p key={ val._id } className='text-gray-400 text-sm'>{ val.value }</p>
                )
              ))
            }
          </div>
        </div>
        <div className={ `${ open ? 'rotate-90' : ''}` }>
          <NavArrowRight />
        </div>
      </button>
      <ul className={ `flex gap-3 w-full flex-wrap overflow-hidden transition ${open ? 'h-auto mb-4' : 'h-0 my-0'} ` }>
        {
          values?.map(({ _id, value, checked }: any) => {
            return (
              <li key={ _id } className={ `${ values.length < 5 ? 'basis-[calc(50%-0.6rem)]' : 'basis-[calc(25%-0.6rem)]'}` } >
                <input type="checkbox" id={ _id } checked={ checked } hidden onChange={ () => null } />
                <label 
                  htmlFor={ _id } 
                  className={ `border rounded w-full h-12 flex items-center justify-center text-sm transition cursor-pointer ${checked ? 'bg-gray-950 text-white' : 'bg-white hover:bg-gray-950 hover:text-white hover:border-black'}` }
                  onClick={ () => toggleFilterCheckbox(filterId, _id) }
                >
                  {value}
                </label>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
