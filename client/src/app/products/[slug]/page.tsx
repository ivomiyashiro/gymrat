import { Metadata } from 'next';
import { getProductBySlug } from '@/services';
import { Gallery, Information, Recommendations } from '@/components/sections/product';

interface Props { params: { slug: string } }
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await getProductBySlug(params.slug);
  const currentVariant = product?.variants.filter(variant => variant.slug === params.slug)[0];

  const title = product?.title.toLowerCase().replace(/\b\w/g, function(l) {
    return l.toUpperCase();
  }).replace(/-t/g, ' T');

  return {
    title: title + ` - ${currentVariant?.color} | Gymrat`,
    description: product?.description
  };
}

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
      <Recommendations category={ product.category } />
    </main>
  );
}
