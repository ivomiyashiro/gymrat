"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
var JWT_EXPIRES = process.env.JWT_EXPIRES;
var genJWT = function (_a) {
    var uid = _a.uid, name = _a.name, role = _a.role;
    return new Promise(function (resolve, reject) {
        var payload = { uid: uid, name: name, role: role };
        jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES
        }, function (error, token) {
            if (error) {
                console.log(error);
                reject('Can not generate the token.');
            }
            resolve(token);
        });
    });
};
exports.genJWT = genJWT;
