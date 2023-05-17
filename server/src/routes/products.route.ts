import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWTSuperAdmin } from '../middlewares';
import { createProduct, deleteProduct, getAllProducts, getOneProduct, searchProducts, updateProduct } from '../controllers/products.controller';

const router = Router();
 
router.get('/', getAllProducts);
 
router.get('/:id', getOneProduct);

router.get('/search/:search', searchProducts);

// Protected routes
router.use(validateJWTSuperAdmin);

router.post(
  '/',
  [
    check('title', 'Title is required.').not().isEmpty(),
    check('vendor', 'Vendor is required.').not().isEmpty(),
    check('category', 'Category is required.').not().isEmpty(),
    validateFields
  ],
  createProduct
);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);
 
export default router;
