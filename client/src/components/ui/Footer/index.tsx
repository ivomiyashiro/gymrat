import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-gray-950 text-white rounded-tl-[3.5rem]'>
      <div className='py-20 flex flex-col justify-between lg:flex-row px-4 lg:px-10 2xl:px-16 gap-12 lg:gap-20'>
        <div className='flex flex-col gap-6 max-w-[600px]'>
          <h3 className='font-semibold text-xl 2xl:text-2xl'>
            Get a first peek at new products, special offers, Gymrat how-tos, and so much more.
          </h3>
          <form className='flex gap-4'>
            <input 
              type="email" 
              placeholder='Email address...'
              className='py-3 px-4 text-gray-950 rounded w-full'
            />
            <button className='font-semibold bg-blue-600 h-full py-3 px-6 rounded'>
              SUBMIT
            </button>
          </form>
        </div>
        <nav className='shrink-0'>
          <ul className='grid grid-cols-2 md:grid-cols-4 justify-end gap-y-12'>
            <li className='2xl:min-w-[200px] xl:min-w-[175px] lg:min-w-[135px]'>
              <span className='font-semibold block mb-4 whitespace-nowrap'>SHOP ONLINE</span>
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link href='/products?gender=women' className='hover:underline cursor-pointer'>Women</Link>
                </li>
                <li>
                  <Link href='/products?gender=men' className='hover:underline cursor-pointer'>Men</Link>
                </li>
                <li>
                  <Link href='/products?category=accessories' className='hover:underline cursor-pointer'>Accessories</Link>
                </li>
              </ul>
            </li>
            <li className='2xl:min-w-[200px] xl:min-w-[175px]'>
              <span className='font-semibold block mb-4 whitespace-nowrap'>MY ACCOUNT</span>
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link href='/signin' className='hover:underline cursor-pointer'>Sign In</Link>
                </li>
                <li>
                  <Link href='/signup' className='hover:underline cursor-pointer'>Sign Up</Link>
                </li>
              </ul>
            </li>
            <li className='2xl:min-w-[200px] xl:min-w-[175px]'>
              <span className='font-semibold block mb-4 whitespace-nowrap'>HELP</span>
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link href='/orders' className='hover:underline cursor-pointer'>Orders</Link>
                </li>
                <li>
                  <Link href='/orders' className='hover:underline cursor-pointer'>Delivery Info</Link>
                </li>
                <li>
                  <Link href='/orders' className='hover:underline cursor-pointer'>Make a Return</Link>
                </li>
                <li>
                  <button className='hover:underline cursor-pointer'>Cookies Policy</button>
                </li>
              </ul>
            </li>
            <li className='2xl:min-w-[200px] xl:min-w-[175px]'>
              <span className='font-semibold block mb-4 whitespace-nowrap'>SOCIAL MEDIA</span>
              <ul className='flex flex-col gap-2'>
                <li>
                  <a href='https://www.facebook.com/Gymshark/' aria-label='Link to Gymrat Facebook profile' target='_blank' className='hover:underline cursor-pointer' rel="noreferrer">Facebook</a>
                </li>
                <li>
                  <a href='https://www.instagram.com/gymshark/' aria-label='Link to Gymrat Instagram profile' target='_blank' className='hover:underline cursor-pointer' rel="noreferrer">Instagram</a>
                </li>
                <li>
                  <a href='https://twitter.com/gymshark' aria-label='Link to Gymrat Twitter profile' target='_blank' className='hover:underline cursor-pointer' rel="noreferrer">Twitter</a>
                </li>
                <li>
                  <a href='https://www.youtube.com/user/GymSharkTV' aria-label='Link to Gymrat Twitter profile' target='_blank' className='hover:underline cursor-pointer' rel="noreferrer">Youtube</a>
                </li>
                <li>
                  <a href='https://www.tiktok.com/@gymshark' aria-label='Link to Gymrat Twitter profile' target='_blank' className='hover:underline cursor-pointer' rel="noreferrer">TikTok</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className='border-t border-gray-800'>
        <div className='mx-auto py-8 md:py-2 px-6 lg:px-10 2xl:px-16 flex flex-col md:flex-row justify-between'>
          <p className='font-semibold text-sm'>© GYMRAT 2023</p>
          <p className='font-semibold text-sm'>Crafted by <a href='https://ivomiyashiro.vercel.app/' target='_blank' className='hover:underline'>@ivomiyashiro</a></p>
        </div>
      </div>
    </footer>
  );
};
