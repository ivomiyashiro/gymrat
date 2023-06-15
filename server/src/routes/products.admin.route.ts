import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWTSuperAdmin } from '../middlewares';
import { createProduct, deleteProduct, getAllProducts, getProductBySlug, updateProduct } from '../controllers/products.controller';

const router = Router();

router.get('/' ,getAllProducts);
 
router.get('/:slug', getProductBySlug);

// Protected routes
router.use(validateJWTSuperAdmin);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);
 
export default router;
