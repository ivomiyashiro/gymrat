import { Router } from 'express';
import { validateCustomer, validateJWTAdmin, validateJWTSuperAdmin } from '../middlewares';
import { getAllCustomers, getCustomerOrder, getCustomerOrders, updateCustomer } from '../controllers/user.controller';
 
const router = Router();

router.get('/', validateJWTAdmin, getAllCustomers);

router.get('/:uid/orders', validateCustomer, getCustomerOrders);

router.get('/:uid/orders/:id', validateCustomer, getCustomerOrder);

router.put('/:uid', validateJWTSuperAdmin, updateCustomer);


export default router;
