import { Product } from '../models';

interface IItems {
  product: string;
  variant: string;
  price: number;
  quantity: number;
}

export const isDBPriceCorrect = async (totalPrice: string, { req }: any) => {

  const { items }: { items: IItems[] } = req.body;
  let dbTotalPrice = 0;

  try {
    for (let i = 0; i < items.length; i++) {
      const product = await Product.find({ _id: items[i].product })
        .select('price');
  
      const price = product[0].price * items[i].quantity;
      dbTotalPrice += price;
    }

    if (Number(totalPrice) !== dbTotalPrice) {
      throw new Error();
    }
  
    return true;

  } catch (error) {
    console.log(error);
    throw new Error('Total price is not correct.');
  }
};
