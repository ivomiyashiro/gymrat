"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Seq = new mongoose_1.Schema({
    id: {
        type: String,
        default: 'seq'
    },
    number: {
        type: Number
    }
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Seq', Seq);
