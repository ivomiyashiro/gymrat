import { IProductFilters } from '../interfaces';

export const adaptProductReqFilters = (filtersReq: IProductFilters[]) => {

  const filters: any = {};

  for (let i = 0; i < filtersReq.length; i++) {
    const keys = Object.keys(filtersReq[i]);

    if (keys.includes('price')) {
      const numbers = filtersReq[i].price!.map(item => {
        const matches = item.match(/\d+/g);
        return matches ? matches.map(Number) : [];
      });

      let maxNumber = -Infinity;
      let minNumber = Infinity;

      numbers.forEach(item => {
        item.forEach(number => {
          if (number > maxNumber) {
            maxNumber = number;
          }
          if (number < minNumber) {
            minNumber = number;
          }
        });
      });

      filters['price'] = { 
        $lte: maxNumber,
        $gte: minNumber
      };   
    }

    if (keys.includes('category')) {
      filters['category'] = filtersReq[i].category;
    }

    if (keys.includes('color')) {
      filters['variants.color'] = { $in: filtersReq[i].color };
    }

    if (keys.includes('includeOutOfStock') && filtersReq[i].includeOutOfStock === false) {
      filters['variants.inventory'] = { $gt: 0 };
    }

    if (keys.includes('size')) {
      filters['variants.size'] = { $in: filtersReq[i].size };
    }

    if (keys.includes('status') && filtersReq[i].status === 'ACTIVE') {
      filters['status'] = 'ACTIVE';
    }

    if (keys.includes('status') && filtersReq[i].status === 'DRAFT') {
      filters['status'] = 'DRAFT';
    }

    if (keys.includes('fitType')) {
      filters['fitType'] = { $in: filtersReq[i].fitType };
    }

    if (keys.includes('gender')) {
      filters['gender'] = { $in: filtersReq[i].gender };
    }
  }

  return filters;
};
