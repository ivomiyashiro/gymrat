"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateJWT = function (req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized request.'
        });
    }
    try {
        var _a = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET), uid = _a.uid, name = _a.name, role = _a.role;
        req.auth = { uid: uid, name: name, role: role };
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized request.'
        });
    }
};
exports.validateJWT = validateJWT;
