import { Request, Response } from 'express';
import { SortOrder } from 'mongoose';
import { Product } from '../models';
import { IDataReq, IProduct, IVariant } from '../interfaces';
import { adaptProductReqFilters } from '../helpers';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = [{}];
const DEFAULT_SORT_BY = 'title';
const DEFAULT_ORDER_BY = 'asc';

export const getAllProducts = async (req: Request, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, filters: reqFilters, search } = req.query as IDataReq;

  let products;

  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const filters = adaptProductReqFilters(reqFilters ? JSON.parse(reqFilters as unknown as string) : DEFAULT_FILTERS);

    if (!!search) {
      products = await Product.find({ ...filters, $or: [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }] 
      })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy as SortOrder]])
        .exec();
    } else {
      products = await Product.find(filters)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy as SortOrder]])
        .exec();
    }

    const count = await Product.count();

    return res.json({
      ok: true,
      products,
      totalPages: Math.ceil(count / limit)
    });
    
  } catch (error: any) {
    console.log(error);

    if (error.name == 'CastError' && error.kind == 'ObjectId') {
      return res.status(500).json({
        ok: false,
        msg: 'ObjectId is not valid.'
      });
    }

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};


export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.json({
      ok: true,
      product
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {

  const body: IProduct = req.body;

  try {
    // Calculate totalInventory
    const totalInventory = body.variants?.reduce((acc: number, variant: IVariant) => {
      return acc + variant.inventory;
    }, 0);

    // Create product and saves it
    const product = new Product({
      ...body,
      totalInventory,
    });
    await product.save();

    return res.json({
      ok: true,
      product
    });
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {

  const productsIDs = JSON.parse(req.params.id);

  try {
    const { deletedCount } = await Product.deleteMany({ _id: { $in: productsIDs } });

    return res.json({
      ok: true,
      msg: `${ deletedCount } product/s deleted.`
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const productsIDs = JSON.parse(req.params.id);

  try {
    const { modifiedCount } = await Product.updateMany({ _id: { $in: productsIDs } }, { $set: req.body });

    return res.json({
      ok: true,
      msg: `${ modifiedCount } product/s updated.`
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }
};
