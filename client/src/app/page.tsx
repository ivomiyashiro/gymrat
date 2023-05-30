import { Hero, Testimonials, NewArrivals } from '@/components/pages';

export default function Home() {
  return (
    <main className='mt-[102px]'>
      <Hero />
      <Testimonials />
      <NewArrivals />
      <div className='h-screen'></div>
    </main>
  );
}
