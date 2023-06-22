import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, validateJWTAdmin, validateJWTCustomer } from '../middlewares';
import { createOrder, getAllOrders, getOneOrder, updateOrderStatus } from '../controllers/orders.controller';
import { isValidOrderStatus, isValidMobilePhoneNumber, isDBPriceCorrect } from '../helpers';

const router = Router();

router.post(
  '/', 
  [
    validateJWTCustomer,
    check('items', 'At least one cart item is required.').not().isEmpty(),
    check('totalPrice').custom(isDBPriceCorrect),
    check('customerInfo.customer', 'Customer is required.').not().isEmpty(),
    // check('customerInfo.phoneNumber', 'Phone number is required.').not().isEmpty(),
    // check('customerInfo.phoneNumber').custom(isValidMobilePhoneNumber),
    // check('status', 'Status must be either "PENDING", "CANCELLED", "DELIVERED" or blank.').isIn(['PENDING', 'CANCELLED', 'DELIVERED', undefined]),
    // check('shippingInfo.city', 'Shipping address city is required.').not().isEmpty(),
    // check('shippingInfo.locality', 'Shipping address locality is required.').not().isEmpty(),
    // check('shippingInfo.address', 'Shipping address address is required.').not().isEmpty(),
    // check('shippingInfo.zip', 'Shipping address zip is required.').not().isEmpty(),
    validateFields
  ],
  createOrder
);

router.use(validateJWTAdmin);

router.get('/', getAllOrders);

router.get('/:id', getOneOrder);

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
