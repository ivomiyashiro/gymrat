import { Cancel } from 'iconoir-react';
import { Modal } from '@/components/ui/Modal';

interface Props {
  open: boolean;
  handleToggleMenu: () => void;
}

export const FiltersMenu = ({ open, handleToggleMenu }: Props) => {
  return (
    <Modal isOpen={ open } handleOpen={ handleToggleMenu } withBackground>
      <aside className={ `fixed top-0 right-0 h-screen bg-white z-50 transition-all overflow-hidden ${ open ? 'w-full lg:w-[470px]' : 'w-[0px]' }` }>
        <div className='flex flex-col h-full relative'>
          <div className='p-4 shadow flex items-center justify-between'>
            <h2 className='font-bold text-3xl'>FILTERS</h2>
            <button aria-label='Close' className='h-9 w-9 rounded-md flex items-center justify-center' onClick={ handleToggleMenu }>
              <Cancel width={ 28 } height={ 28 } strokeWidth={ 1.7 } />
            </button>
          </div>
        </div>
      </aside>
    </Modal>
  );
};
