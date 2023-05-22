"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middlewares_1 = require("../middlewares");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.post('/signup', [
    (0, express_validator_1.check)('name', 'Name is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is not valid.').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required.').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password length must be higher than 6.').isLength({ min: 6 }),
    middlewares_1.validateFields
], auth_controller_1.signUp);
router.post('/signin', [
    (0, express_validator_1.check)('email', 'Email is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required.').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required.').not().isEmpty(),
    middlewares_1.validateFields
], auth_controller_1.singIn);
router.post('/renew', middlewares_1.validateJWT, auth_controller_1.renewToken);
router.get('/signout', middlewares_1.validateJWT, auth_controller_1.signOut);
router.get('/oauth/google', auth_controller_1.googleOauthHandler);
exports.default = router;
