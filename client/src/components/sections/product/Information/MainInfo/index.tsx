import { TCategory, TFitType } from '@/interfaces';

interface Props {
  title: string;
  price: number;
  category: TCategory;
  fitType: TFitType;
}

export const MainInfo = ({ title, price, category, fitType }: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex justify-between items-start gap-4'>
        <h1 className='font-semibold text-2xl'>{ title }</h1>
        <h3 className='text-2xl font-semibold'>${ price }</h3>
      </div>
      <p className='text-gray-500 text-sm mt-1'>{ category }</p>
      <p className='text-gray-500 text-sm'>{ fitType }</p>
    </div>
  );
};
