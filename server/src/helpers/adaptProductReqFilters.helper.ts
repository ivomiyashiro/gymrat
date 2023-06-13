import { IProductFilters } from '../interfaces';

export const adaptProductReqFilters = (filtersReq: IProductFilters[]) => {

  const modelFilters: any = {};
  const populateFilters: any = {};

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

      modelFilters['price'] = { 
        $lte: maxNumber,
        $gte: minNumber
      };   
    }

    if (keys.includes('category')) {
      modelFilters['category'] = filtersReq[i].category;
    }

    if (keys.includes('status') && filtersReq[i].status === 'ACTIVE') {
      modelFilters['status'] = 'ACTIVE';
    }

    if (keys.includes('status') && filtersReq[i].status === 'DRAFT') {
      modelFilters['status'] = 'DRAFT';
    }

    if (keys.includes('fitType')) {
      modelFilters['fitType'] = { $in: filtersReq[i].fitType };
    }

    if (keys.includes('gender')) {
      modelFilters['gender'] = { $in: filtersReq[i].gender };
    }

    if (keys.includes('color')) {
      populateFilters['color'] = { $in: filtersReq[i].color };
    }

    if (keys.includes('includeOutOfStock') && filtersReq[i].includeOutOfStock === false) {
      populateFilters['inventory'] = { $gt: 0 };
    }

    if (keys.includes('size')) {
      populateFilters['size'] = { $in: filtersReq[i].size };
      populateFilters['inventory'] = { $gt: 0 };
    }
  }

  return { modelFilters, populateFilters };
};
