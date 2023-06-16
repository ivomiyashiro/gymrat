import { getProductBySlug } from '@/services';
import { Gallery, Information, Recommendations } from '@/components/sections/product';

interface Props { params: { slug: string } }

export default async function Product({ params }: Props) {
  const { product } = await getProductBySlug(params.slug);
  const currentVariant = product?.variants.filter(variant => variant.slug === params.slug)[0];

  if (!product) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <main className='mt-[102px]'>
      <section className='md:flex w-full max-w-[1640px] md:py-8 md:px-4 lg:px-24'>
        <Gallery productTitle={ product.title } images={ currentVariant?.images } />
        <Information
          product={ product }
          variant={ currentVariant! }
        />
      </section>
      <section>
        <Recommendations />
      </section>
    </main>
  );
}
