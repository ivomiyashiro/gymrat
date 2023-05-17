import { Request, Response } from 'express';
import { IAuthRequest } from 'interfaces';
import { Order, Seq } from '../models';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = {};
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_ORDER_BY = 'asc';

export const getAllOrders = async (req: Request, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, filters: reqFilters, search }: any = req.query;

  const filters = JSON.parse(reqFilters) || DEFAULT_FILTERS;
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const orders = await Order.find({ ...filters, $or: [
      { number: { $regex: search, $options: 'i' } }] 
    })
      .populate('customer', '-password -email -role -createdAt -updatedAt -__v')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sortBy, orderBy]])
      .exec();

    const count = await Order.count();

    return res.json({
      ok: true,
      orders,
      totalPages: Math.ceil(count / limit)
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const getOneOrder = async (req: Request, res: Response) => {

  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', '-password -role -createdAt -updatedAt -__v');

    return res.json({
      ok: true,
      order
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const createOrder = async (req: IAuthRequest, res: Response) => {
  
  let orderNumber: number;

  try {
    const seq = await Seq.findOneAndUpdate(
      { id: 'seq' },
      { '$inc': { 'number': 1 } },
      { new: true }
    );
    
    if (seq === null) {
      orderNumber = 1001;
      const newSeq = new Seq({ id: 'seq', number: 1001 });
      await newSeq.save();
    } else orderNumber = seq.number;

    const order = new Order({
      ...req.body,
      number: orderNumber
    });

    await order.save();

    return res.json({
      ok: true,
      order
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  
  const orderIDs = JSON.parse(req.params.id);
  const orderStatus = req.body.status.toUpperCase();

  try {
    await Order.updateMany({ _id: orderIDs }, { status: orderStatus });

    return res.json({
      ok: true,
      msg: `Order status is now ${ orderStatus }`
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const searchOrder = async (req: Request, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage }: any = req.query;

  const search = req.params.search || '';
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const orders = await Order.find({ number: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sortBy, orderBy]])
      .exec();

    const count = await Order.count();

    return res.json({
      ok: true,
      orders,
      totalPages: Math.ceil(count / limit)
    });
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};


