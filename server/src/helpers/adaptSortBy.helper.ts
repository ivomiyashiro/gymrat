export const adaptSortBy = (value: string) => {
  if (value === 'PRICE') {
    return 'price';
  }

  return 'createdAt';
};
