import { IProduct } from '@/interfaces';

export const getOneColorForVariant = (products: IProduct[]) => {
  return products.map(product => {
    let colors: string[] = [];
    return {
      ...product,
      variantsToPrint: product.variants.filter(variant => {
        if (!(colors.includes(variant.color))){
          colors = [ ...colors, variant.color ];
          return variant;
        }
      })
    };
  });
};
