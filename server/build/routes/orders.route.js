"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middlewares_1 = require("../middlewares");
var orders_controller_1 = require("../controllers/orders.controller");
var helpers_1 = require("../helpers");
var router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validateJWTCustomer,
    (0, express_validator_1.check)('items', 'At least one cart item is required.').not().isEmpty(),
    (0, express_validator_1.check)('totalPrice').custom(helpers_1.isDBPriceCorrect),
    (0, express_validator_1.check)('customerInfo.customer', 'Customer is required.').not().isEmpty(),
    (0, express_validator_1.check)('customerInfo.phoneNumber', 'Phone number is required.').not().isEmpty(),
    (0, express_validator_1.check)('customerInfo.phoneNumber').custom(helpers_1.isValidMobilePhoneNumber),
    (0, express_validator_1.check)('status', 'Status must be either "PENDING", "CANCELLED", "DELIVERED" or blank.').isIn(['PENDING', 'CANCELLED', 'DELIVERED', undefined]),
    (0, express_validator_1.check)('shippingInfo.city', 'Shipping address city is required.').not().isEmpty(),
    (0, express_validator_1.check)('shippingInfo.locality', 'Shipping address locality is required.').not().isEmpty(),
    (0, express_validator_1.check)('shippingInfo.address', 'Shipping address address is required.').not().isEmpty(),
    (0, express_validator_1.check)('shippingInfo.zip', 'Shipping address zip is required.').not().isEmpty(),
    middlewares_1.validateFields
], orders_controller_1.createOrder);
router.use(middlewares_1.validateJWTAdmin);
router.get('/', orders_controller_1.getAllOrders);
router.get('/:id', orders_controller_1.getOneOrder);
router.put('/:id', [
    (0, express_validator_1.check)('status', 'New status is required.').not().isEmpty(),
    (0, express_validator_1.check)('status', 'Status is not valid.').custom(helpers_1.isValidOrderStatus),
    middlewares_1.validateFields
], orders_controller_1.updateOrderStatus);
exports.default = router;
