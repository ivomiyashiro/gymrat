"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var search_controller_1 = require("../controllers/search.controller");
var router = (0, express_1.Router)();
router.get('/:search', middlewares_1.validateJWTAdmin, search_controller_1.search);
exports.default = router;
