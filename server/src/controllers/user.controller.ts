import { Response } from 'express';
import { SortOrder } from 'mongoose';
import { Order, User } from '../models';
import { IAuthRequest, IDataReq } from '../interfaces';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = {};
const DEFAULT_SORT_BY = 'created_at';
const DEFAULT_ORDER_BY = 'asc';

export const getCustomerOrders = async (req: IAuthRequest, res: Response) => {
  let orders = [];
  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, filters: reqFilters, search: searchText }: any = req.query;

  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const filters = { 
      ...JSON.parse(reqFilters || JSON.stringify(DEFAULT_FILTERS)), 
      'customerInfo._id': req.auth?.uid 
    };

    if (!!searchText) {
      orders = await Order.find({ 
        ...filters, 
        number: { $regex: searchText, $options: 'i' } 
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([['createdAt', orderBy as SortOrder]])
        .exec();
    } else {
      orders = await Order.find(filters)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([['createdAt', orderBy as SortOrder]])
        .exec();
    }

    const count = await Order.count();

    return res.json({
      ok: true,
      orders,
      count,
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
    const order = await Order.findOne({ 
      _id: req.params.id, 
      'customerInfo._id': req.auth?.uid
    });

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

export const updateCustomerOrder = async (req: IAuthRequest, res: Response) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: req.auth?.uid }, {
      status: 'CANCELLED'
    });

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

export const getAllUsers = async (req: IAuthRequest, res: Response) => {
  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, search } = req.query as IDataReq;
  
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  let users;
  let usersOrders: { items: any[], count: number }[] = [];

  try {
    if (!!search) {
      users = await User.find({ $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }] 
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy as SortOrder]])
        .select('-password')
        .exec();
    } else {
      users = await User.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy as SortOrder]])
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

export const updateUser = async (req: IAuthRequest, res: Response) => {
  const { ids } = req.query;

  if (!ids) {
    return res.json({
      ok: false,
      msg: 'Customer id is needed.'
    });
  }

  if (req.body.role !== 'ADMIN' && req.body.role !== 'SUPERADMIN' && req.body.role !== 'CUSTOMER') {
    return res.json({
      ok: false,
      msg: `${ req.body.role } is not accepted.`
    });
  }

  const update = req.body;

  try {
    await User.updateMany({ _id: { $in: JSON.parse(ids as string) } }, update);

    return res.json({
      ok: true,
      msg: 'User updated.'
    });

  } catch (error: any) {
    console.log(error);

    if (error.name === 'CastError') {
      return res.status(500).json({
        ok: false,
        msg: 'Invalid customer ID.'
      });
    }

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const deleteUser = async (req: IAuthRequest, res: Response) => {
  const usersIDs = JSON.parse(req.params.id);

  if (usersIDs.length === 0) {
    return res.json({
      ok: false,
      msg: 'Customer id is needed.'
    });
  }

  try {
    await User.deleteMany({ _id: { $in: usersIDs } });

    return res.json({
      ok: true,
      msg: 'Customer deleted.'
    });

  } catch (error: any) {
    console.log(error);

    if (error.name === 'CastError') {
      return res.status(500).json({
        ok: false,
        msg: 'Invalid customer ID.'
      });
    }

    return res.status(500).json({
      ok: false,
      msg: error
    });
  }
};
