

export const cancelDBOrder = async (customerId: string, orderId: string) => {
  try {
    const url = `${process.env.API_BASE_URL}/storefront/user/${ customerId }/orders/${ orderId }`;

    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
    });
    const { ok, order, msg } = await response.json();
    if (!ok) throw new Error(msg);

    return { order };
    
  } catch (error) {
    console.log(error);

    return { order: null };
  }
};
