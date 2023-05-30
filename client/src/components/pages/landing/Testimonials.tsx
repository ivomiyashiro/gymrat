import { MensHealthLogo, ShapeLogo, VogueLogo } from '@/components/svgs';

export const Testimonials = () => {
  return (
    <section className='bg-gray-200 p-10 pt-20 pb-10'>
      <div className="flex justify-center gap-12 flex-wrap">
        <div className="flex flex-col items-center justify-between">
          <p className='text-center max-w-[400px]'>
            &quot;Is praised for its trendy and fashionable activewear designs, allowing individuals to feel stylish and confident while working out.&quot;
          </p>
          <VogueLogo fill='#1c1917' width={ 125 } height={ 125 } />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className='text-center max-w-[400px]'>
            &quot;Community of fitness enthusiasts through social media and events, offering motivation, inspiration, and a sense of belonging to its customers.&quot;
          </p>
          <ShapeLogo fill='#1c1917' width={ 125 } height={ 125 } />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className='text-center max-w-[400px]'>
            &quot;Durability, moisture-wicking properties, and comfort, providing the necessary support for various types of physical activities.&quot;
          </p>
          <MensHealthLogo fill='#1c1917' width={ 150 } height={ 125 } />
        </div>
      </div>
    </section>
  );
};
