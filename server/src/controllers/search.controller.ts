import { Response, Request } from 'express';
import { Order, Product, User } from '../models';

export const search = async (req: Request, res: Response) => {

  const query = req.params.search;

  try {
    const users = await User.find({ $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }] 
    })
      .limit(10)
      .sort([['created_at', 'asc']])
      .select('name email')
      .exec();
  
    const orders = await Order.find({ $or: [
      { number: { $regex: query, $options: 'i' } }
    ] })
      .populate({ path: 'customer', select: '-password -email -role -createdAt -updatedAt -__v', match: { name: { $regex: query, $options: 'i' } } })
      .limit(10)
      .sort([['created_at', 'asc']])
      .select('number customer created_at')
      .exec();
  
    const products = await Product.find({ $or: [
      { title: { $regex: query, $options: 'i' } }
    ] })
      .limit(10)
      .sort([['created_at', 'asc']])
      .select('inventory title images')
      .exec();

    return res.status(400).json({
      ok: true,
      users,
      orders,
      products
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};
