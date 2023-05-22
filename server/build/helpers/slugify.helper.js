"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
var slugify = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var value = args.join(' ');
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, '-');
};
exports.slugify = slugify;
