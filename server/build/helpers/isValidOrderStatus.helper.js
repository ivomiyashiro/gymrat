"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidOrderStatus = void 0;
var isValidOrderStatus = function (value) {
    if (value !== 'DELIVERED' && value !== 'PENDING' && value !== 'CANCELLED')
        return false;
    return true;
};
exports.isValidOrderStatus = isValidOrderStatus;
