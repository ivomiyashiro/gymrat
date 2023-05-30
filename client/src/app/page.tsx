import { Hero, Testimonials, LastArrivals } from '@/components/pages';

export default function Home() {
  return (
    <main className='mt-[102px]'>
      <Hero />
      <Testimonials />
      <LastArrivals />
      <div className='h-screen'></div>
    </main>
  );
}
