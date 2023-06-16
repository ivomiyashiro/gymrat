import { IProduct } from '@/interfaces';

export const getProductColorSizes = (product: IProduct, color: string) => {
  const colorVariants = product.variants
    .filter(variant => variant.color === color)
    .sort((a, b) => {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
    
      const sizeA = sizeOrder.indexOf(a.size);
      const sizeB = sizeOrder.indexOf(b.size);
  
      return sizeA - sizeB;
    });

  return colorVariants.map(variant => ({ 
    _id: variant._id,
    size: variant.size,
    inventory: variant.inventory 
  }));
};
