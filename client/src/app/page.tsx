'use client';
import { Hero } from '@/components/pages';
import { ProductCardsList } from '@/components/ui';
import { useProducts } from '@/hooks';

export default function Home() {

  const { products, loading, error } = useProducts({ limit: 10 });

  return (
    <main className='mt-[102px]'>
      <Hero />
      <div className="h-screen">
        <ProductCardsList products={ products } />
      </div>
    </main>
  );
}
