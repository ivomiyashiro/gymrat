"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPassword = void 0;
var genPassword = function () {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var passwordLength = 12;
    var password = '';
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
};
exports.genPassword = genPassword;
