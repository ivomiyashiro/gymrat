import jwt from 'jsonwebtoken';

interface IProps {
  uid: string,
  name: string,
  role: 'CUSTOMER' | 'ADMIN' | 'SUPERADMIN',
 }

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES as string;

export const genJWT = ({ uid, name, role }: IProps) => {

  return new Promise((resolve, reject) => {

    const payload = { uid, name, role };

    jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES
    }, (error, token) => {

      if (error) {
        console.log(error);
        reject('Can not generate the token.');
      }

      resolve(token);
    });
  });
};
