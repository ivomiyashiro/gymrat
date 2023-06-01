import { Router } from 'express';
import { validateCustomer } from '../middlewares';
import { getCustomerOrder, getCustomerOrders } from '../controllers/user.controller';
 
const router = Router();

router.use(validateCustomer);

router.get('/:uid/orders', getCustomerOrders);

router.get('/:uid/orders/:id', getCustomerOrder);

export default router;
