"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStatusFilter = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateStatusFilter = function (req, res, next) {
    var reqFilters = req.query.filters;
    var filters = reqFilters ? JSON.parse(reqFilters) : [{}];
    var keys = filters.map(function (filter) { return Object.keys(filter)[0]; });
    if (keys.includes('status')) {
        var token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized request.'
            });
        }
        try {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return next();
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized request.'
            });
        }
    }
    return next();
};
exports.validateStatusFilter = validateStatusFilter;
