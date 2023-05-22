"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRounter = exports.UserRouter = exports.OrdersRouter = exports.ProductsRouter = exports.AuthRouter = void 0;
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
var products_route_1 = require("./products.route");
Object.defineProperty(exports, "ProductsRouter", { enumerable: true, get: function () { return __importDefault(products_route_1).default; } });
var orders_route_1 = require("./orders.route");
Object.defineProperty(exports, "OrdersRouter", { enumerable: true, get: function () { return __importDefault(orders_route_1).default; } });
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
var search_route_1 = require("./search.route");
Object.defineProperty(exports, "SearchRounter", { enumerable: true, get: function () { return __importDefault(search_route_1).default; } });
