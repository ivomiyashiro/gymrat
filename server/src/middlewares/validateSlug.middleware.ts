import { Product } from '../models';

export const validateSlug = async (value: string) => {
  const slug = await Product.find({ slug: value });
  
  if (slug.length > 0) {
    throw new Error('Slug already exists.');
  }

  return true;
};
