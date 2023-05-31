import { Hero, Testimonials, NewArrivals, Banner } from '@/components/pages';
import { Categories } from '@/components/pages/landing/Categories';

export default function Home() {
  return (
    <main className='mt-[102px]'>
      <Hero />
      <Testimonials />
      <NewArrivals />
      <section className='bg-gray-200 px-4 py-24 md:py-32 lg:px-20 flex flex-col gap-32 lg:gap-40'>
        <Banner 
          title='FULL FOCUS. PURE PERFORMANCE.'
          p1='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio esse nobis nostrum voluptates quis necessitatibus voluptatem officia perferendis repudiandae, consequuntur itaque dicta commodi eius laboriosam optio porro!'
          p2='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio esse nobis nostrum voluptates quis.'
          image='/images/deadlift-banner.webp' 
          altText='Jamal Browner Shares His 6 Powerlifting Tips For A Stronger Deadlift'
          reverse={ false }
          buttonText='SHOP MEN'
        />
        <Banner 
          title='FULL FOCUS. PURE PERFORMANCE.'
          p1='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio esse nobis nostrum voluptates quis necessitatibus voluptatem officia perferendis repudiandae, consequuntur itaque dicta commodi eius laboriosam optio porro!'
          p2='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio esse nobis nostrum voluptates quis.'
          image='/images/shoulder-press-banner.webp' 
          altText='Jamal Browner Shares His 6 Powerlifting Tips For A Stronger Deadlift'
          reverse={ true }
          buttonText='SHOP WOMEN'
        />
      </section>
      <NewArrivals />
      <Categories />
    </main>
  );
}
