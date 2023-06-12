import { Request, Response } from 'express';
import { SortOrder } from 'mongoose';

import { Product } from '../models';
import { IAuthRequest, IDataReq, IProduct, TVariant } from '../interfaces';

import { adaptProductReqFilters, adaptSortBy } from '../helpers';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = [{}];
const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_ORDER_BY = 1;

export const getAllProducts = async (req: IAuthRequest, res: Response) => {

  const { 
    sortBy: reqSortBy, 
    orderBy: reqOrderBy, 
    limit: reqLimit, 
    page: reqPage, 
    filters: reqFilters, 
    search 
  } = req.query as IDataReq;

  let products;

  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = adaptSortBy(reqSortBy) || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const filters = adaptProductReqFilters(reqFilters ? JSON.parse(reqFilters as unknown as string) : DEFAULT_FILTERS);

    if (!!search) {
      products = await Product.aggregate([
        {
          $match: {
            'variants.inventory': { $gt: 0 },
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { 'variants.color': { $regex: search, $options: 'i' } }
            ]
          }
        },
        {
          $project: {
            title: 1,
            description: 1,
            price: 1,
            colors: 1,
            gender: 1,
            sizes: 1,
            discountPrice: 1,
            totalInventory: 1,
            category: 1,
            status: 1,
            images: 1,
            tags: 1,
            fitType: 1,
            variants: {
              $filter: {
                input: '$variants',
                as: 'variant',
                cond: { $gt: ['$$variant.inventory', 0] }
              }
            }
          }
        },
        { $sort: { [sortBy]: Number(orderBy) as 1 | -1 } },
      ])
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

    } else {
      products = await Product.find(filters)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
    }

    return res.json({
      ok: true,
      products,
      totalPages: Math.ceil(products.length / limit)
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

export const getStorefrontProducts = async (req: Request, res: Response) => {
  const { 
    sortBy: reqSortBy, 
    orderBy: reqOrderBy, 
    limit: reqLimit, 
    page: reqPage, 
    filters: reqFilters, 
    search 
  } = req.query as IDataReq;

  let products;

  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = adaptSortBy(reqSortBy) || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const filters = adaptProductReqFilters(reqFilters ? JSON.parse(reqFilters as unknown as string) : DEFAULT_FILTERS);

    if (!!search) {
      products = await Product.aggregate([
        {
          $match: {
            'variants.inventory': { $gt: 0 },
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { 'variants.color': { $regex: search, $options: 'i' } }
            ],
            status: 'ACTIVE'
          }
        },
        {
          $project: {
            title: 1,
            description: 1,
            price: 1,
            colors: 1,
            gender: 1,
            sizes: 1,
            discountPrice: 1,
            totalInventory: 1,
            category: 1,
            status: 1,
            images: 1,
            tags: 1,
            fitType: 1,
            variants: {
              $filter: {
                input: '$variants',
                as: 'variant',
                cond: { $gt: ['$$variant.inventory', 0] }
              }
            }
          }
        },
        { $sort: { [sortBy]: Number(orderBy) as 1 | -1 } },
      ])
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

    } else {
      products = await Product.find({ ...filters, status: 'ACTIVE' })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy as SortOrder]])
        .exec();
    }

    return res.json({
      ok: true,
      products,
      totalPages: Math.ceil(products.length / limit)
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
    const totalInventory = body.variants?.reduce((acc: number, variant: TVariant) => {
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
