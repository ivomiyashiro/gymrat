import { Response } from 'express';
import { Order, User } from '../models';
import { IAuthRequest } from '../interfaces';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = {};
const DEFAULT_SORT_BY = 'created_at';
const DEFAULT_ORDER_BY = 'asc';

export const getCustomerOrders = async (req: IAuthRequest, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, filters: reqFilters }: any = req.query;

  const filters = { ...JSON.parse(reqFilters), id: req.auth?.uid } || { ...DEFAULT_FILTERS, id: req.auth?.uid };
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const orders = await Order.find(filters)
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

export const getCustomerOrder = async (req: IAuthRequest, res: Response) => {

  try {
    const order = await Order.findOne({ id: req.params.id });

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

export const getAllCustomers = async (req: IAuthRequest, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, filters: reqFilters, search }: any = req.query;
  
  const filters = { ...JSON.parse(reqFilters), id: req.auth?.uid } || { ...DEFAULT_FILTERS, id: req.auth?.uid };
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;
  let users;
  let usersOrders: { items: any[], count: number }[] = [];

  try {
    if (!!search) {
      users = await User.find({ ...filters, $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }] 
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy]])
        .select('-password')
        .exec();
    } else {
      users = await User.find(filters)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy]])
        .select('-password')
        .exec();
    }

    const userIDs = users.map(user => user.id);

    for (let i = 0; i < userIDs.length; i++) {
      const items: any = await Order.find({ 'customer': userIDs[i] }).select('items');
      const count = await Order.find({ 'customer': userIDs[i] }).count();
      usersOrders = [ ...usersOrders, { items, count } ];
    }

    const resData: any = users.map((user: any, i) => {
      return {
        ...user._doc,
        totalOrders: usersOrders[i].count,
      };
    });

    const count = await User.count();

    return res.json({
      ok: true,
      users: resData,
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

export const updateCustomer = async (req: IAuthRequest, res: Response) => {

  const userIDs =  JSON.parse(req.params.uid);
  const update = req.body;

  try {
    await User.updateMany({ _id: { $in: userIDs } }, update);

    return res.json({
      ok: true,
      msg: 'Product updated.'
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};
