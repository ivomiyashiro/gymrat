import { IProduct } from '@/interfaces';

export const getOneColorForVariant = (products: IProduct[]) => {
  return products.map(product => {
    const colors = new Set();

    return {
      ...product,
      variantsToPrint: product.variants.filter(variant => {
        if (colors.has(variant.color)) return false; 

        colors.add(variant.color);
        return true;
      }).sort((a, b) => a.name.localeCompare(b.name))
    };
  });
};
