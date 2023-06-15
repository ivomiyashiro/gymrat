import { MensHealthLogo, ShapeLogo, VogueLogo } from '@/components/svgs';

export const Testimonials = () => {
  return (
    <section className='bg-gray-200'>
      <div className="flex justify-center md:justify-between flex-wrap gap-8 w-full px-10 pt-20 pb-10 lg:px-24 max-w-[1640px] mx-auto">
        <div className="flex flex-col items-center">
          <p className='text-center max-w-[284px] md:max-w-[22vw] 2xl:max-w-[18vw]'>
            &quot;Is praised for its trendy and fashionable activewear designs, allowing individuals to feel stylish and confident while working out.&quot;
          </p>
          <VogueLogo fill='#1c1917' width={ 125 } height={ 125 } />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className='text-center max-w-[284px] md:max-w-[22vw] 2xl:max-w-[18vw]'>
            &quot;Community of fitness enthusiasts through social media and events, offering motivation, inspiration, and a sense of belonging to its customers.&quot;
          </p>
          <ShapeLogo fill='#1c1917' width={ 125 } height={ 125 } />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className='text-center max-w-[284px] md:max-w-[22vw] 2xl:max-w-[18vw]'>
            &quot;Durability, moisture-wicking properties, and comfort, providing the necessary support for various types of physical activities.&quot;
          </p>
          <MensHealthLogo fill='#1c1917' width={ 150 } height={ 125 } />
        </div>
      </div>
    </section>
  );
};
