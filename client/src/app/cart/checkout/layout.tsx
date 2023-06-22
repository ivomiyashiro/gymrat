import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { checkToken } from '@/services';
import { CheckoutProvider } from '@/context';

import { OrderSummary } from '@/components/sections';

export const metadata = {
  title: 'Checkout | Gymrat',
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  let user = null;
  const token = cookies().get('token');

  if (!token) redirect('/auth/login?returnUrl=/cart/checkout');

  user = await checkToken(token.value);

  if (!user) redirect('/auth/login?returnUrl=/cart/checkout');

  const cart: any = cookies().get('CART');

  if (JSON.parse(cart.value).length === 0) redirect('/products');
  
  return (
    <main className='w-full h-screen flex flex-col lg:flex-row'>
      <OrderSummary />
      <CheckoutProvider>
        { children }
      </CheckoutProvider>
    </main>
  );
};
