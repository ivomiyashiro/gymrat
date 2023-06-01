import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWTSuperAdmin, validateStatusFilter } from '../middlewares';
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from '../controllers/products.controller';
import { isDBSlugCorrect } from '../helpers';

const router = Router();

router.get('/' ,getAllProducts);
 
router.get('/:id', getOneProduct);

// Protected routes
router.use(validateJWTSuperAdmin);

router.post('/',[
  check('category', 'Category is required.').not().isEmpty(),
  check('category', 'Category is not valid.').isIn(['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS']),
  check('gender', 'Gender is required.'),
  check('gender', 'Gender is not valid.').isIn(['WOMEN', 'MEN', 'BOTH']),
  check('fitType', 'FitType is not valid.').isIn(['REGULAR', 'SLIM', 'OVERSIZED', undefined]),
  check('colors', 'Color is required.').not().isEmpty(),
  check('status', 'Status must be either "ACTIVE" or "DRAFT".').isIn(['ACTIVE', 'DRAFT']),
  check('title', 'Title is required.').not().isEmpty(),
  check('variants', 'Variants are required.').not().isEmpty(),
  validateFields
], createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);
 
export default router;
