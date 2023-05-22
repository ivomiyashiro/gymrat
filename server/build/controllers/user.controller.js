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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getCustomerOrder = exports.getCustomerOrders = void 0;
var models_1 = require("../models");
var DEFAULT_LIMIT = 10;
var DEFAULT_PAGE = 1;
var DEFAULT_FILTERS = {};
var DEFAULT_SORT_BY = 'created_at';
var DEFAULT_ORDER_BY = 'asc';
var getCustomerOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reqSortBy, reqOrderBy, reqLimit, reqPage, reqFilters, filters, orderBy, sortBy, limit, page, orders, count, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, reqSortBy = _a.sortBy, reqOrderBy = _a.orderBy, reqLimit = _a.limit, reqPage = _a.page, reqFilters = _a.filters;
                filters = __assign(__assign({}, JSON.parse(reqFilters)), { id: (_b = req.auth) === null || _b === void 0 ? void 0 : _b.uid }) || __assign(__assign({}, DEFAULT_FILTERS), { id: (_c = req.auth) === null || _c === void 0 ? void 0 : _c.uid });
                orderBy = reqOrderBy || DEFAULT_ORDER_BY;
                sortBy = reqSortBy || DEFAULT_SORT_BY;
                limit = Number(reqLimit) || DEFAULT_LIMIT;
                page = Number(reqPage) || DEFAULT_PAGE;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, models_1.Order.find(filters)
                        .limit(limit)
                        .skip((page - 1) * limit)
                        .sort([[sortBy, orderBy]])
                        .exec()];
            case 2:
                orders = _d.sent();
                return [4 /*yield*/, models_1.Order.count()];
            case 3:
                count = _d.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        orders: orders,
                        totalPages: Math.ceil(count / limit)
                    })];
            case 4:
                error_1 = _d.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCustomerOrders = getCustomerOrders;
var getCustomerOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Order.findOne({ id: req.params.id })];
            case 1:
                order = _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        order: order
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
exports.getCustomerOrder = getCustomerOrder;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reqSortBy, reqOrderBy, reqLimit, reqPage, search, orderBy, sortBy, limit, page, users, usersOrders, userIDs, i, items, count_1, resData, count, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, reqSortBy = _a.sortBy, reqOrderBy = _a.orderBy, reqLimit = _a.limit, reqPage = _a.page, search = _a.search;
                orderBy = reqOrderBy || DEFAULT_ORDER_BY;
                sortBy = reqSortBy || DEFAULT_SORT_BY;
                limit = Number(reqLimit) || DEFAULT_LIMIT;
                page = Number(reqPage) || DEFAULT_PAGE;
                usersOrders = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                if (!!!search) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.User.find({ $or: [
                            { name: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } }
                        ]
                    })
                        .limit(limit)
                        .skip((page - 1) * limit)
                        .sort([[sortBy, orderBy]])
                        .select('-password')
                        .exec()];
            case 2:
                users = _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, models_1.User.find()
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .sort([[sortBy, orderBy]])
                    .select('-password')
                    .exec()];
            case 4:
                users = _b.sent();
                _b.label = 5;
            case 5:
                userIDs = users.map(function (user) { return user.id; });
                i = 0;
                _b.label = 6;
            case 6:
                if (!(i < userIDs.length)) return [3 /*break*/, 10];
                return [4 /*yield*/, models_1.Order.find({ 'customer': userIDs[i] }).select('items')];
            case 7:
                items = _b.sent();
                return [4 /*yield*/, models_1.Order.find({ 'customer': userIDs[i] }).count()];
            case 8:
                count_1 = _b.sent();
                usersOrders = __spreadArray(__spreadArray([], usersOrders, true), [{ items: items, count: count_1 }], false);
                _b.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 6];
            case 10:
                resData = users.map(function (user, i) {
                    return __assign(__assign({}, user._doc), { totalOrders: usersOrders[i].count });
                });
                return [4 /*yield*/, models_1.User.count()];
            case 11:
                count = _b.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        users: resData,
                        totalPages: Math.ceil(count / limit)
                    })];
            case 12:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ids, update, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.query.ids;
                if (!ids) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            msg: 'Customer id is needed.'
                        })];
                }
                if (req.body.role !== 'ADMIN' && req.body.role !== 'SUPERADMIN' && req.body.role !== 'CUSTOMER') {
                    return [2 /*return*/, res.json({
                            ok: false,
                            msg: "".concat(req.body.role, " is not accepted.")
                        })];
                }
                update = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.updateMany({ _id: { $in: JSON.parse(ids) } }, update)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        msg: 'User updated.'
                    })];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                if (error_4.name === 'CastError') {
                    return [2 /*return*/, res.status(500).json({
                            ok: false,
                            msg: 'Invalid customer ID.'
                        })];
                }
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersIDs, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersIDs = JSON.parse(req.params.id);
                if (usersIDs.length === 0) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            msg: 'Customer id is needed.'
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.deleteMany({ _id: { $in: usersIDs } })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        msg: 'Customer deleted.'
                    })];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                if (error_5.name === 'CastError') {
                    return [2 /*return*/, res.status(500).json({
                            ok: false,
                            msg: 'Invalid customer ID.'
                        })];
                }
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: error_5
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
