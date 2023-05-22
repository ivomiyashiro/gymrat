import { IOrderFilters } from '../interfaces';

export const adaptOrderReqFilters = (filtersReq: IOrderFilters[]) => {

  const filters: any = {};

  for (let i = 0; i < filtersReq.length; i++) {
    const keys = Object.keys(filtersReq[i]);

    if (keys.includes('totalPrice')) {
      const priceKeys = Object.keys(filtersReq[i].totalPrice!);

      if (priceKeys.includes('min') && !priceKeys.includes('max')) {
        filters['totalPrice'] = { $gte: filtersReq[i].totalPrice!.min };
      }
      else if (priceKeys.includes('max') && !priceKeys.includes('min')) {
        filters['totalPrice'] = { $lte: filtersReq[i].totalPrice!.max };        
      }
      else {
        filters['totalPrice'] = { 
          $lte: filtersReq[i].totalPrice!.max,
          $gte: filtersReq[i].totalPrice!.min
        };        
      }
    }

    if (keys.includes('status') && filtersReq[i].status === 'PENDING') {
      filters['status'] = 'PENDING';
    }

    if (keys.includes('status') && filtersReq[i].status === 'CANCELLED') {
      filters['status'] = 'CANCELLED';
    }

    if (keys.includes('status') && filtersReq[i].status === 'DELIVERED') {
      filters['status'] = 'DELIVERED';
    }
  }

  return filters;
};
