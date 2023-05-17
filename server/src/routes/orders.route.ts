import { Router } from 'express';
import { check } from 'express-validator';
import { isValidOrderStatus } from '../helpers';
import { validateFields, validateJWTAdmin, validateJWTCustomer } from '../middlewares';
import { createOrder, getAllOrders, getOneOrder, searchOrder, updateOrderStatus } from '../controllers/orders.controller';

const router = Router();

router.post(
  '/', 
  [
    validateJWTCustomer,
    check('items', 'At least one cart item is required.').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('shippingAddress.city', 'Shipping address city is required.').not().isEmpty(),
    check('shippingAddress.locality', 'Shipping address locality is required.').not().isEmpty(),
    check('shippingAddress.address', 'Shipping address address is required.').not().isEmpty(),
    check('shippingAddress.zip', 'Shipping address zip is required.').not().isEmpty(),
    validateFields
  ],
  createOrder
);

router.use(validateJWTAdmin);

router.get('/', getAllOrders);

router.get('/:id', getOneOrder);

router.get('/search/:search', searchOrder);

router.put(
  '/:id', 
  [
    check('status', 'New status is required.').not().isEmpty(),
    check('status', 'Status is not valid.').custom(isValidOrderStatus),
    validateFields
  ],
  updateOrderStatus
);


export default router;
