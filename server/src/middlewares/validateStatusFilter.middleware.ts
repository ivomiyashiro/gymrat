import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IProductFilters } from '../interfaces';

export const validateStatusFilter = (req: Request, res: Response, next: NextFunction) => {

  const { filters: reqFilters } = req.query;
  const filters = reqFilters ? JSON.parse(reqFilters as string) : [{}];
  const keys = filters.map((filter: IProductFilters) => Object.keys(filter)[0]);

  if (keys.includes('status')) {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized request.'
      });
    }
  
    try {
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
  
      return next();
      
    } catch (error) {
      console.log(error);
  
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized request.'
      });
    }
  }
  
  return next();
};
