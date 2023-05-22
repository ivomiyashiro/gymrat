"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOauthHandler = exports.renewToken = exports.signOut = exports.singIn = exports.signUp = void 0;
var User_model_1 = __importDefault(require("../models/User.model"));
var helpers_1 = require("../helpers");
var services_1 = require("../services");
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_model_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'Email is already in use.'
                        })];
                user = new User_model_1.default(req.body);
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, helpers_1.genJWT)({ uid: user.id, name: user.name, role: user.role })];
            case 4:
                token = _a.sent();
                res.cookie('token', token);
                return [2 /*return*/, res.status(201).json({
                        ok: true,
                        user: {
                            uid: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        }
                    })];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var singIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isValidPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_model_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'Email or password are incorrect.',
                        })];
                return [4 /*yield*/, user.comparePassword(password)];
            case 3:
                isValidPassword = _b.sent();
                if (!isValidPassword)
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'Email or password are incorrect.'
                        })];
                return [4 /*yield*/, (0, helpers_1.genJWT)({ uid: user.id, name: user.name, role: user.role })];
            case 4:
                token = _b.sent();
                res.cookie('token', token);
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        user: {
                            uid: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        }
                    })];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.singIn = singIn;
var signOut = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie('token');
            res.status(200).json({
                ok: true,
                msg: 'Successfully signed out.'
            });
        }
        catch (error) {
            console.log(error);
            return [2 /*return*/, res.status(500).json({
                    ok: false,
                    msg: 'Internal server error.'
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.signOut = signOut;
var renewToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, uid, name, role, token, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (!req.auth)
                    throw new Error;
                _a = req.auth, uid = _a.uid, name = _a.name, role = _a.role;
                return [4 /*yield*/, (0, helpers_1.genJWT)({ uid: uid, name: name, role: role })];
            case 1:
                token = _b.sent();
                return [4 /*yield*/, User_model_1.default.findById(uid)];
            case 2:
                user = _b.sent();
                if (!!!user) {
                    res.clearCookie('token');
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'User not found.'
                        })];
                }
                res.cookie('token', token);
                return [2 /*return*/, res.json({
                        ok: true,
                        user: {
                            uid: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        }
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
exports.renewToken = renewToken;
var googleOauthHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var CLIENT_ORIGIN, code, _a, id_token, access_token, googleUser, user, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                code = req.query.code;
                if (!code) {
                    return [2 /*return*/, res.status(401).json({
                            ok: false,
                            msg: 'Authorization code not provided!',
                        })];
                }
                return [4 /*yield*/, (0, services_1.getGoogleOAuthTokens)({ code: code })];
            case 2:
                _a = _b.sent(), id_token = _a.id_token, access_token = _a.access_token;
                return [4 /*yield*/, (0, services_1.getGoogleUser)({ id_token: id_token, access_token: access_token })];
            case 3:
                googleUser = _b.sent();
                if (!googleUser.verified_email) {
                    return [2 /*return*/, res.status(403).json({
                            ok: false,
                            msg: 'Google account is not verified.'
                        })];
                }
                return [4 /*yield*/, User_model_1.default.findOne({ email: googleUser.email })];
            case 4:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 6];
                user = new User_model_1.default({
                    name: googleUser.name,
                    email: googleUser.email,
                    password: (0, helpers_1.genPassword)()
                });
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [4 /*yield*/, (0, helpers_1.genJWT)({ uid: user.id, name: user.name, role: user.role })];
            case 7:
                token = _b.sent();
                res.cookie('token', token, {
                    expires: new Date(Date.now() + (10 * 60 * 60 * 1000))
                });
                return [2 /*return*/, res.redirect(CLIENT_ORIGIN)];
            case 8:
                error_4 = _b.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        msg: 'Internal server error.'
                    })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.googleOauthHandler = googleOauthHandler;
