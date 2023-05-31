import { Hero, Testimonials, NewArrivals, Banners } from '@/components/pages';
import { Categories } from '@/components/pages/landing/Categories';

export default function Home() {
  return (
    <main className='mt-[102px]'>
      <Hero />
      <Testimonials />
      <NewArrivals />
      <Banners />
      <NewArrivals />
      <Categories />
    </main>
  );
}
