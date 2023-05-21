import { Router } from 'express';
import { validateCustomer, validateJWTAdmin, validateJWTSuperAdmin } from '../middlewares';
import { deleteUser, getAllUsers, getCustomerOrder, getCustomerOrders, updateUser } from '../controllers/user.controller';
 
const router = Router();

router.get('/', validateJWTAdmin, getAllUsers);

router.delete('/:id', validateJWTSuperAdmin, deleteUser);

router.put('/', validateJWTSuperAdmin, updateUser);

router.get('/:uid/orders', validateCustomer, getCustomerOrders);

router.get('/:uid/orders/:id', validateCustomer, getCustomerOrder);

export default router;
