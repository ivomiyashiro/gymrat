import { NextFunction, Request, Response } from 'express';
import { IProductFilters } from '../interfaces';

export const validateStatusFilter = (req: Request, res: Response, next: NextFunction) => {

  const { filters: reqFilters } = req.query;
  const filters = reqFilters ? JSON.parse(reqFilters as string) : [{}];
  const keys = filters.map((filter: IProductFilters) => Object.keys(filter)[0]);

  if (keys.includes('status')) {
    return res.status(401).json({
      ok: false,
      msg: 'Not possible to filter by status.'
    });
  }
  
  return next();
};
