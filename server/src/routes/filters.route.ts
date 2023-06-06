import { Router } from 'express';
import { getProductsFilters } from '../controllers/filters.controller';
 
const router = Router();

router.get('/', getProductsFilters);

export default router;
