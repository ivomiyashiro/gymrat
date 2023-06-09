import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from '../models';
import { getFiltersAttributes } from '../helpers';

export const getProductsFilters = async (_req: Request, res: Response) => {

  try {
    const products = await Product.aggregate([
      {
        $match: {
          'variants.inventory': { $gt: 0 },
          status: 'ACTIVE'
        }
      },
      {
        $project: {
          price: 1,
          gender: 1,
          discountPrice: 1,
          category: 1,
          fitType: 1,
          variants: {
            $filter: {
              input: '$variants',
              as: 'variant',
              cond: { $gt: ['$$variant.inventory', 0] }
            }
          }
        }
      }
    ])
      .exec();

    const { sizes, colors, categories, genders, fitTypes } = getFiltersAttributes(products);
    const priceValues = ['0$ - 10$', '10$ - 20$', '20$ - 30$', '30$ - 50$', '50$ - 75$', '75$ - 100$', '+ 100$'];

    return res.json({
      ok: true,
      filters: [
        { _id: new mongoose.Types.ObjectId(), name: 'size', values: sizes },
        { _id: new mongoose.Types.ObjectId(), name: 'color', values: colors },
        { _id: new mongoose.Types.ObjectId(), name: 'category', values: categories },
        { _id: new mongoose.Types.ObjectId(), name: 'gender', values: genders },
        { _id: new mongoose.Types.ObjectId(), name: 'fitType', values: fitTypes },
        { _id: new mongoose.Types.ObjectId(), name: 'price', values: priceValues },
      ]
    });
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }

};
