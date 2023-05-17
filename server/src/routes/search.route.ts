import { Router } from 'express';

import { validateJWTAdmin } from '../middlewares';

import { search } from '../controllers/search.controller';
 
const router = Router();
 
router.get('/:search', validateJWTAdmin , search);
 
export default router;
