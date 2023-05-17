import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IAuthRequest } from 'interfaces';

export const validateJWTSuperAdmin = (req: IAuthRequest, res: Response, next: NextFunction) => {

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Unauthorized request.'
    });
  }

  try {
    const { uid, name, role } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (role !== 'SUPERADMIN') throw Error('Unauthorized request.');
    req.auth = { uid, name, role };
    
    return next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Unauthorized request.'
    });
  }
};
