"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMobilePhoneNumber = void 0;
var isValidMobilePhoneNumber = function (phoneNumber) {
    var mobilePhonePattern = /^\+\d{1,2} \d{1,2} [0-9]{4}-[0-9]{4}$/;
    if (!mobilePhonePattern.test(phoneNumber)) {
        throw new Error('Invalid phone number.');
    }
    return true;
};
exports.isValidMobilePhoneNumber = isValidMobilePhoneNumber;
