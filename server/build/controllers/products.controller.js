"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getOneProduct = exports.getAllProducts = void 0;
var models_1 = require("../models");
var helpers_1 = require("../helpers");
var DEFAULT_LIMIT = 10;
var DEFAULT_PAGE = 1;
var DEFAULT_FILTERS = [{}];
var DEFAULT_SORT_BY = 'title';
var DEFAULT_ORDER_BY = 'asc';
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reqSortBy, reqOrderBy, reqLimit, reqPage, reqFilters, search, products, orderBy, sortBy, limit, page, filters, count, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, reqSortBy = _a.sortBy, reqOrderBy = _a.orderBy, reqLimit = _a.limit, reqPage = _a.page, reqFilters = _a.filters, search = _a.search;
                orderBy = reqOrderBy || DEFAULT_ORDER_BY;
                sortBy = reqSortBy || DEFAULT_SORT_BY;
                limit = Number(reqLimit) || DEFAULT_LIMIT;
                page = Number(reqPage) || DEFAULT_PAGE;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                filters = (0, helpers_1.adaptProductReqFilters)(reqFilters ? JSON.parse(reqFilters) : DEFAULT_FILTERS);
                if (!!!search) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.Product.find(__assign(__assign({}, filters), { $or: [
                            { title: { $regex: search, $options: 'i' } },
                            { category: { $regex: search, $options: 'i' } }
                        ] }))
                        .limit(limit)
                        .skip((page - 1) * limit)
                        .sort([[sortBy, orderBy]])
                        .exec()];
            case 2:
                products = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, models_1.Product.find(filters)
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort([[sortBy, orderBy]])
                    .exec()];
            case 4:
                products = _b.sent();
                _b.label = 5;
            case 5: return [4 /*yield*/, models_1.Product.count()];
            case 6:
                count = _b.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        products: products,
                        totalPages: Math.ceil(count / limit)
                    })];
            case 7:
                error_1 = _b.sent();
                console.log(error_1);
                if (error_1.name == 'CastError' && error_1.kind == 'ObjectId') {
                    return [2 /*return*/, res.status(500).json({
                            ok: false,
                            msg: 'ObjectId is not valid.'
                        })];
                }
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var getOneProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        product: product
                    })];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOneProduct = getOneProduct;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, totalInventory, product, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                totalInventory = (_a = body.variants) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, variant) {
                    return acc + variant.inventory;
                }, 0);
                product = new models_1.Product(__assign(__assign({}, body), { totalInventory: totalInventory }));
                return [4 /*yield*/, product.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        product: product
                    })];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsIDs, deletedCount, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productsIDs = JSON.parse(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.deleteMany({ _id: { $in: productsIDs } })];
            case 2:
                deletedCount = (_a.sent()).deletedCount;
                return [2 /*return*/, res.json({
                        ok: true,
                        msg: "".concat(deletedCount, " product/s deleted.")
                    })];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsIDs, modifiedCount, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productsIDs = JSON.parse(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Product.updateMany({ _id: { $in: productsIDs } }, { $set: req.body })];
            case 2:
                modifiedCount = (_a.sent()).modifiedCount;
                return [2 /*return*/, res.json({
                        ok: true,
                        msg: "".concat(modifiedCount, " product/s updated.")
                    })];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
