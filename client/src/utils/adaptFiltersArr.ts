import { IProductFilters } from '@/interfaces';

export const adaptFiltersArr = (arr: IProductFilters[]) => {
  const checkedFilterSections = arr.filter(filter => (
    filter.values.filter(val => val.checked).length !== 0
  ));

  const checkedFilter = checkedFilterSections.map(filter => ({
    ...filter,
    values: filter.values.filter(val => val.checked)
  }));

  const adaptedData = checkedFilter.map(obj => {
    const newObj: any = {};
    newObj[obj.name] = obj.values.map(val => val.value);
    
    return newObj;
  });

  return adaptedData;
};
