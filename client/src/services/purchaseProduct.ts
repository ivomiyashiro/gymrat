import { IOrder } from '@/interfaces';

interface IItem {
  product: string;
  variant: string;
  price: number;
  quantity: number;
}

interface ICustomer {
  customer: string;
  phoneNumber: string;
}

interface IShippingInfo {
  city: string;
  locality: string;
  address: string;
  zip: string;
}

export const purchaseProduct = async (items: IItem[], totalPrice: number, customerInfo: ICustomer, shippingInfo: IShippingInfo) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}/admin/orders`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        items,
        totalPrice,
        customerInfo,
        shippingInfo,
      })
    });

    const { ok, order, msg }: {ok: boolean, order: IOrder, msg: string } = await response.json();
    if (!ok) throw new Error(msg);

    return order;
    
  } catch (error) {
    console.log(error);

    return null;
  }
};
