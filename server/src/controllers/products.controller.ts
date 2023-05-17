import { Request, Response } from 'express';
import { slugify } from '../helpers';
import { IVariant } from 'interfaces';
import { Category, Product, Variant, Vendor } from '../models';

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_FILTERS = {};
const DEFAULT_SORT_BY = 'title';
const DEFAULT_ORDER_BY = 'asc';

export const getAllProducts = async (req: Request, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage, filters: reqFilters, search }: any = req.query;

  let products;
  const filters = JSON.parse(reqFilters) || DEFAULT_FILTERS;
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    if (!!search) {
      products = await Product.find({ ...filters, $or: [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { vendor: { $regex: search, $options: 'i' } }] 
      })
        .populate('variants')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy]])
        .exec();
    } else {
      products = await Product.find(filters)
        .populate('variants')
        .limit(limit)
        .skip((page - 1) * limit)
        .sort([[sortBy, orderBy]])
        .exec();
    }

    const count = await Product.count();

    return res.json({
      ok: true,
      products,
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


export const getOneProduct = async (req: Request, res: Response) => {

  try {
    const product = await Product.findById(req.params.id)
      .populate('variants');

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

  let category;
  let vendor;
  try {

    category = await Category.find({ name: req.body.category.name });

    if (!category) {
      category = new Category({
        name: req.body.category.name
      });
    }

    vendor = await Vendor.find({ name: req.body.vendor.name });

    if (!vendor) {
      vendor = new Category({
        name: req.body.vendor.name
      });
    }

    if (req.body.variants.length === 0) {
      const product = new Product(req.body);
      await product.save();
  
      return res.json({
        ok: true,
        product
      });
    }

    const variants = await Variant.insertMany(req.body.variants);
    const product = new Product({
      ...req.body,
      category,
      vendor,
      variants: variants.map(variant => variant._id),
      slug: slugify(req.body.title)
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
    const products = await Product.find({ _id: productsIDs });
    const { deletedCount } = await Product.deleteMany({ _id: { $in: productsIDs } });
    await Variant.deleteMany({ _id: products.map(product => product.variants)[0] });

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
  const productsIDs =  JSON.parse(req.params.id);
  const { variants, ...restOfBody } = req.body;
  const variantsIDs = variants.map((variant: IVariant) => variant._id);
  const variantData = variants.map((variant: IVariant) => {
    const { _id, ...restOfVariant } = variant;

    return {
      ...restOfVariant
    };
  });

  try {
    await Product.updateMany({ _id: { $in: productsIDs } }, { $set: restOfBody });
    for (let i = 0; i < variantData.length; i++) {
      await Variant.updateOne({ _id: variantsIDs[i] }, { $set: variantData[i] });
    }

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

export const searchProducts = async (req: Request, res: Response) => {

  const { sortBy: reqSortBy, orderBy: reqOrderBy, limit: reqLimit, page: reqPage }: any = req.query;

  const search = req.params.search || '';
  const orderBy = reqOrderBy || DEFAULT_ORDER_BY;
  const sortBy = reqSortBy || DEFAULT_SORT_BY;
  const limit = Number(reqLimit) || DEFAULT_LIMIT;
  const page = Number(reqPage) || DEFAULT_PAGE;

  try {
    const products = await Product.find({ $text: { $search: search } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort([[sortBy, orderBy]])
      .exec();

    const count = await Product.count();

    return res.json({
      ok: true,
      products,
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
