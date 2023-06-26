import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: Props) => {
  return (
    <div className='relative overflow-x-auto w-full'>
      <div className='flex relative'>
        <table className={ `w-full min-w-full border-collapse ${ className }` }>
          { children }
        </table>
      </div>
    </div>
  );
};
