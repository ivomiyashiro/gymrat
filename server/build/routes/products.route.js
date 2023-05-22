"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middlewares_1 = require("../middlewares");
var products_controller_1 = require("../controllers/products.controller");
var helpers_1 = require("../helpers");
var router = (0, express_1.Router)();
router.get('/', middlewares_1.validateStatusFilter, products_controller_1.getAllProducts);
router.get('/:id', products_controller_1.getOneProduct);
// Protected routes
router.use(middlewares_1.validateJWTSuperAdmin);
router.post('/', [
    (0, express_validator_1.check)('category', 'Category is required.').not().isEmpty(),
    (0, express_validator_1.check)('category', 'Category is not valid.').isIn(['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS']),
    (0, express_validator_1.check)('fitType', 'FitType is not valid.').isIn(['REGULAR', 'SLIM', 'OVERSIZED', undefined]),
    (0, express_validator_1.check)('colors', 'Color is required.').not().isEmpty(),
    (0, express_validator_1.check)('slug', 'Slug are required.').not().isEmpty(),
    (0, express_validator_1.check)('slug').custom(helpers_1.isDBSlugCorrect),
    (0, express_validator_1.check)('status', 'Status must be either "ACTIVE" or "DRAFT".').isIn(['ACTIVE', 'DRAFT']),
    (0, express_validator_1.check)('title', 'Title is required.').not().isEmpty(),
    (0, express_validator_1.check)('variants', 'Variants are required.').not().isEmpty(),
    middlewares_1.validateFields
], products_controller_1.createProduct);
router.delete('/:id', products_controller_1.deleteProduct);
router.put('/:id', products_controller_1.updateProduct);
exports.default = router;
