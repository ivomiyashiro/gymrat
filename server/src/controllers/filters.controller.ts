import { Request, Response } from 'express';
import { Product } from '../models';
import { getFiltersAttributes } from '../helpers';
import { getProductsMinMaxPrice } from '../helpers/getVariantsMaxMinPrice';

export const getProductsFilters = async (req: Request, res: Response) => {

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

    const { sizes, colors, category, gender, fitType } = getFiltersAttributes(products);
    const { maxPrice, minPrice } = getProductsMinMaxPrice(products);


    return res.json({
      ok: true,
      sizes,
      colors,
      category,
      gender,
      fitType,
      price: {
        min: minPrice,
        max: maxPrice
      }
    });
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error.'
    });
  }

};
