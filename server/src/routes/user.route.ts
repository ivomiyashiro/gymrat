import { Router } from 'express';
import { validateCustomer, validateJWTAdmin, validateJWTSuperAdmin } from '../middlewares';
import { deleteCustomer, getAllCustomers, getCustomerOrder, getCustomerOrders, updateCustomer } from '../controllers/user.controller';
 
const router = Router();

router.get('/', validateJWTAdmin, getAllCustomers);

router.delete('/', validateJWTSuperAdmin, deleteCustomer);

router.put('/', validateJWTSuperAdmin, updateCustomer);

router.get('/:uid/orders', validateCustomer, getCustomerOrders);

router.get('/:uid/orders/:id', validateCustomer, getCustomerOrder);

export default router;
