import './globals.css';
import { Poppins } from 'next/font/google';

import { ToastProvider, CartProvider, LayoutProvider } from '@/context';
import { ToastContainer } from '@/components/ui';
import { AuthProvider } from '@/context/auth';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
});

export const metadata = {
  title: 'Gymrat Official Nest: Men\'s & Women\'s Workout Apparel',
  description: 'Shop a wide variety of men\'s and women\'s workout apparel, exclusively online.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={ poppins.className }>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <LayoutProvider>
                { children }
              </LayoutProvider>
            </CartProvider>
          </AuthProvider>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
