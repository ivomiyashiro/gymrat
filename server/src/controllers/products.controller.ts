import { Request, Response } from 'express';
import { SortOrder } from 'mongoose';

import { Product, Variant } from '../models';
import { IAuthRequest, IDataReq, IProduct, TVariant } from '../interfaces';

import { adaptProductReqFilters, adaptSortBy, slugify } from '../helpers';

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
        .populate('variants')
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

export const getStorefrontProducts = async (req: Request, res: Response) => {
  const { 
    sortBy: reqSortBy, 
    orderBy: reqOrderBy, 
    limit: reqLimit, 
    page: reqPage, 
    filters: reqFilters, 
    search: searchText
  } = req.query as IDataReq;

  let products;

  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = adaptSortBy(reqSortBy) || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const { modelFilters, populateFilters } = adaptProductReqFilters(reqFilters ? JSON.parse(reqFilters as unknown as string) : DEFAULT_FILTERS);

    if (!!searchText) {
      products = await Product.aggregate([
        {
          $lookup: {
            from: 'variants',
            localField: 'variants',
            foreignField: '_id',
            as: 'variants'
          }
        },
        {
          $match: {
            $or: [
              { title: { $regex: searchText, $options: 'i' } },
              { 'variants.color': { $regex: searchText, $options: 'i' } }
            ]
          }
        },
        { $sort: { [sortBy]: Number(orderBy) as 1 | -1 } },
      ])
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

    } else {
      products = await Product.find({ ...modelFilters, status: 'ACTIVE' })
        .populate({
          path: 'variants',
          match: { ...populateFilters }
        })
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

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const product = await Product.aggregate([
      {
        $lookup: {
          from: 'variants', // Nombre de la colección de Variantes
          localField: 'variants',
          foreignField: '_id',
          as: 'variants'
        }
      },
      { $match: { 'variants.slug': slug } },
    ]);

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

  const body: IProduct[] = req.body;
  let products: IProduct[] = [];

  try {
    // Create products and saves it
    for (const productData of body) {
      const variantsArr = productData.variants.map(variantData => {
        // Creates slug for each variant
        const slug = slugify(productData.title + ` ${ variantData.color } ${ (variantData.size !== 'UNIQUE') ? variantData.size : '' }`);
        const variant = new Variant({ ...variantData, slug });

        variant.save()
          .then(() => variant)
          .catch(error => console.log(error));

        return variant;
      });

      // Sum all variants invetories to get product total inventory
      const totalInventory = productData.variants?.reduce((acc: number, variant: TVariant) => {
        return acc + variant.inventory;
      }, 0);

      const product = new Product({
        ...productData,
        totalInventory,
        variants: variantsArr
      });

      const newProduct = await product.save();
      products = [...products, newProduct];
    }

    return res.json({
      ok: true,
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
