

export const isValidOrderStatus = (value: string) => {
  
  if (value !== 'DELIVERED' && value !== 'PENDING' && value !== 'CANCELLED') return false;

  return true;
};
