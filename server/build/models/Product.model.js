"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    colors: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [String]
    },
    discountPrice: {
        type: Number,
        default: null
    },
    totalInventory: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ['SHORTS', 'SPORT BRAS', 'HOODIES & JACKETS', 'T-SHIRTS & TOPS', 'TANK TOPS', 'ACCESSORIES', 'JOGGERS & SWEATPANTS'],
        required: true,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DRAFT'],
        default: 'ACTIVE'
    },
    images: {
        type: [String]
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    fitType: {
        type: String,
        enum: ['REGULAR', 'SLIM', 'OVERSIZED']
    },
    variants: {
        type: [{
                name: {
                    type: String,
                    required: true
                },
                color: {
                    type: String
                },
                size: {
                    type: String,
                    enum: ['XS', 'S', 'M', 'L', 'XL', 'UNIQUE']
                },
                inventory: {
                    type: Number,
                    default: 0
                },
                images: {
                    type: [String],
                    default: []
                }
            }],
        required: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
