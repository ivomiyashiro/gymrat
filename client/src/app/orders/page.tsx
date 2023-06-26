import { OrdersTable } from '@/components/sections/orders';

export default function Orders() {
  return (
    <main className='mt-[102px]'>
      <section className='p-4 lg:px-24 w-full max-w-[1640px] mx-auto'>
        <h1 className='font-bold mt-8'>MY ORDERS</h1>
        <div className='mt-10 mb-20 flex items-center justify-center'>
          <OrdersTable />
        </div>
      </section>
    </main>
  );
}
