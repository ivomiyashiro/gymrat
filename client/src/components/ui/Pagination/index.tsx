import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

interface Props {
  name: string;
  count: number;
  totalPages: number;
  currentPage: number;
  page: number;
  onPageChange: (pageNumber: number) => void
}

export const Pagination = ({
  name,
  count,
  totalPages,
  currentPage,
  page,
  onPageChange,
}: Props) => {
  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  return (
    <div className='flex rounded items-center bg-gray-100 border rounded-8 justify-between mt-8 px-4 py-2 h-[42px]'>
      <p className='text-sm'>
        Total { name }: { count }
      </p>
      {
        totalPages !== 1
        &&
        <ul className='flex items-center gap-3'>
          { currentPage !== 1
          &&
          <li onClick={ onPrevious } className='cursor-pointer'>
            <NavArrowLeft width={ 20 } height={ 20 } />
          </li> }
          { Array(totalPages).fill(null).map((_pageNumber, i: number) => {
            return (
              <li 
                key={ i } 
                className={ `cursor-pointer w-8 h-8 flex items-center justify-center rounded ${page === (i + 1) ? 'bg-black text-white' : 'bg-white'}` }
                onClick={ () => onPageChange(Number(i + 1)) }
              >
                <span className='text-sm'>{ i + 1 }</span>
              </li>
            );
          }) }
          { currentPage !== totalPages
          &&
          <li onClick={ onNext } className='cursor-pointer'>
            <NavArrowRight width={ 20 } height={ 20 } />
          </li> }
        </ul>
      }
    </div>
  );
};
