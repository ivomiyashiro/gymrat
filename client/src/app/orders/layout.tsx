import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkToken } from '@/services';

export const metadata = { title: 'My Orders | Gymrat' };

export default async function Layout({ children }: { children: React.ReactNode }) {
  let user = null;
  const token = cookies().get('token');

  if (token) {
    user = await checkToken(token.value);
  } 

  if (!user) redirect('/auth/login?returnUrl=/orders');

  return (
    <>
      { children }
    </>
  );
}
