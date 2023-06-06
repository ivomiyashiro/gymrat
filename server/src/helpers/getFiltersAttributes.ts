import { IProduct, TVariant } from '../interfaces';

export const getFiltersAttributes = (data: IProduct[]) => {
  const colors = new Set();
  const sizes = new Set();
  const category = new Set();
  const gender = new Set();
  const fitType = new Set();

  data.forEach((item) => {
    category.add(item.category);
    gender.add(item.gender);
    fitType.add(item.fitType);

    item.variants.forEach((variant: TVariant) => {
      colors.add(variant.color);
      sizes.add(variant.size);
    });    
  });

  return {
    colors: Array.from(colors),
    sizes: Array.from(sizes),
    category:Array.from(category),
    gender:Array.from(gender),
    fitType:Array.from(fitType),
  };
};
