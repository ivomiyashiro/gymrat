import { Router } from 'express';
import { getStorefrontProducts, getOneProduct } from '../controllers/products.controller';
import { validateStatusFilter } from '../middlewares';

const router = Router();

router.get('/', validateStatusFilter, getStorefrontProducts);
 
router.get('/:id', getOneProduct);
 
export default router;
