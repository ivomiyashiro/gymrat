import { Hero, Testimonials, NewArrivals, Banners, Categories, ShopWomen, ShopMen } from '@/components/pages/landing';

export default function Home() {
  return (
    <main className='mt-[102px]'>
      <Hero />
      <Testimonials />
      <NewArrivals />
      <Banners />
      <ShopWomen />
      <Categories />
      <ShopMen />
    </main>
  );
}
