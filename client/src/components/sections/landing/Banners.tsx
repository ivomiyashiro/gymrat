import { Banner } from '@/components/ui';

export const Banners = () => {
  return (
    <section className='bg-gray-200'>
      <div className='flex flex-col gap-32 lg:gap-40 p-4 py-24 md:py-32 lg:px-24 w-full max-w-[1640px] mx-auto'>
        <Banner
          title='FULL FOCUS. PURE PERFORMANCE.'
          p1='Experience the epitome of determination and excellence. Unleash your potential with relentless dedication. Elevate your performance to new heights and conquer your fitness goals. Embrace the challenge, surpass the ordinary, and ignite your passion.'
          p2='Focus and unwavering commitment pave the path to success. Embrace the journey, embrace the grind, and become a force to be reckoned with!'
          image='/images/deadlift-banner.webp' 
          altText='Jamal Browner Shares His 6 Powerlifting Tips For A Stronger Deadlift'
          reverse={ false }
          buttonText='SHOP MEN'
        />
        <Banner
          title='FULL FOCUS. PURE PERFORMANCE.'
          p1='Fuel your ambition and channel your energy towards greatness. Unlock the door to success through unwavering focus and unyielding determination. Embrace the journey of self-improvement and discover the true extent of your abilities. Harness the power of perseverance and let it propel you forward.'
          p2='Embrace the full potential that lies within you and watch as you conquer the realm of possibilities.'
          image='/images/shoulder-press-banner.webp' 
          altText='Jamal Browner Shares His 6 Powerlifting Tips For A Stronger Deadlift'
          reverse={ true }
          buttonText='SHOP WOMEN'
        />
      </div>
    </section>
  );
};
