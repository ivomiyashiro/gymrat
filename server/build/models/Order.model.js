"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var OrderScheme = new mongoose_1.Schema({
    number: {
        type: String,
        unique: true,
        required: true
    },
    items: [{
            type: {
                product: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                variant: {
                    type: mongoose_1.Schema.Types.ObjectId
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                },
            },
            required: true
        }],
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['DELIVERED', 'PENDING', 'CANCELLED'],
        default: 'PENDING'
    },
    customerInfo: {
        type: {
            _id: {
                type: mongoose_1.Schema.Types.ObjectId
            },
            name: {
                type: String
            },
            email: {
                type: String
            },
            phoneNumber: {
                type: String,
            }
        },
        required: true
    },
    shippingInfo: {
        type: {
            city: {
                type: String,
            },
            locality: {
                type: String,
            },
            address: {
                type: String,
            },
            zip: {
                type: String,
            }
        },
        required: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Order', OrderScheme);
