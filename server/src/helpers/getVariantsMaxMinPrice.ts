import { IProduct } from '../interfaces';

export const getProductsMinMaxPrice = (products: IProduct[]) => {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  products.forEach((item) => {
    const price = item.discountPrice || item.price || item.price;
    if (price < minPrice) {
      minPrice = price;
    }

    if (price > maxPrice) {
      maxPrice = price;
    }
  });

  return {
    minPrice,
    maxPrice,
  };
};
