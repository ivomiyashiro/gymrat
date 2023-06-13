export const Skeleton = () => {
  return (
    <div className='flex flex-col min-w-0 relative group flex-shrink-0 xl:flex-[1_1]'>
      <div className='relative'>
        <div className='relative w-full h-full pt-[119%] overflow-hidden rounded-[1rem] animate-skeleton-loading'>
        </div>
      </div>
      <div className='p-3 flex flex-col gap-2'>
        <div className='animate-skeleton-loading w-[75%] h-4 rounded'></div>
        <div className='animate-skeleton-loading w-[35%] h-4 rounded'></div>
        <div className='animate-skeleton-loading w-[10%] h-4 rounded'></div>
      </div>
    </div>
  );
};
