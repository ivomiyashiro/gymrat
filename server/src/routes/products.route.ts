import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWTSuperAdmin, validateSlug, validateStatusFilter } from '../middlewares';
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from '../controllers/products.controller';

const router = Router();
 
router.get('/', validateStatusFilter ,getAllProducts);
 
router.get('/:id', getOneProduct);

// Protected routes
router.use(validateJWTSuperAdmin);

router.post('/',[
  check('category', 'Category is required.').not().isEmpty(),
  check('colors', 'Color is required.').not().isEmpty(),
  check('slug', 'Slug are required.').not().isEmpty(),
  check('slug').custom(validateSlug),
  check('status', 'Status must be either "ACTIVE" or "DRAFT".').isIn(['ACTIVE', 'DRAFT']),
  check('title', 'Title is required.').not().isEmpty(),
  check('variants', 'Variants are required.').not().isEmpty(),
  validateFields
], createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);
 
export default router;
