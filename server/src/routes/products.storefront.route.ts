import { Router } from 'express';
import { getStorefrontProducts, getProductBySlug } from '../controllers/products.controller';
import { validateStatusFilter } from '../middlewares';

const router = Router();

router.get('/', validateStatusFilter, getStorefrontProducts);
 
router.get('/:slug', getProductBySlug);
 
export default router;
