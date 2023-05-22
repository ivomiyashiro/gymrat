import { Product } from '../models';

export const isDBSlugCorrect = async (value: string) => {
  const slug = await Product.find({ slug: value });
  
  if (slug.length > 0) {
    throw new Error('Slug already exists.');
  }

  return true;
};
