import { IFilters } from '../interfaces';

export const adaptProductReqFilters = (filtersReq: IFilters[]) => {

  const filters: any = {};

  for (let i = 0; i < filtersReq.length; i++) {
    const keys = Object.keys(filtersReq[i]);

    if (keys.includes('price')) {
      const priceKeys = Object.keys(filtersReq[i].price!);

      if (priceKeys.includes('min') && !priceKeys.includes('max')) {
        filters['price'] = { $gte: filtersReq[i].price!.min };
      }
      else if (priceKeys.includes('max') && !priceKeys.includes('min')) {
        filters['price'] = { $lte: filtersReq[i].price!.max };        
      }
      else {
        filters['price'] = { 
          $lte: filtersReq[i].price!.max,
          $gte: filtersReq[i].price!.min
        };        
      }
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
  }

  return filters;
};
