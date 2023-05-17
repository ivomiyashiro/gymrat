import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields, validateJWT } from '../middlewares';

import { signUp, singIn, renewToken, googleOauthHandler, signOut } from '../controllers/auth.controller';
 
const router = Router();
 
router.post(
  '/signup',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Email is not valid.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'Password length must be higher than 6.').isLength({ min: 6 }),
    validateFields
  ],
  signUp
);
 
router.post(
  '/signin',
  [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Email is required.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    validateFields
  ],
  singIn
);
 
router.post('/renew', validateJWT, renewToken);

router.get('/signout', validateJWT, signOut);

router.get('/oauth/google', googleOauthHandler);
 
export default router;
