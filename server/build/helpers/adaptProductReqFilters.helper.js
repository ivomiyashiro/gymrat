"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptProductReqFilters = void 0;
var adaptProductReqFilters = function (filtersReq) {
    var filters = {};
    for (var i = 0; i < filtersReq.length; i++) {
        var keys = Object.keys(filtersReq[i]);
        if (keys.includes('price')) {
            var priceKeys = Object.keys(filtersReq[i].price);
            if (priceKeys.includes('min') && !priceKeys.includes('max')) {
                filters['price'] = { $gte: filtersReq[i].price.min };
            }
            else if (priceKeys.includes('max') && !priceKeys.includes('min')) {
                filters['price'] = { $lte: filtersReq[i].price.max };
            }
            else {
                filters['price'] = {
                    $lte: filtersReq[i].price.max,
                    $gte: filtersReq[i].price.min
                };
            }
        }
        if (keys.includes('category')) {
            filters['category'] = filtersReq[i].category;
        }
        if (keys.includes('color')) {
            filters['variants.color'] = { $in: filtersReq[i].color };
        }
        if (keys.includes('includeOutOfStock') && filtersReq[i].includeOutOfStock === false) {
            filters['variants.inventory'] = { $gt: 0 };
        }
        if (keys.includes('size')) {
            filters['variants.size'] = { $in: filtersReq[i].size };
        }
        if (keys.includes('status') && filtersReq[i].status === 'ACTIVE') {
            filters['status'] = 'ACTIVE';
        }
        if (keys.includes('status') && filtersReq[i].status === 'DRAFT') {
            filters['status'] = 'DRAFT';
        }
        if (keys.includes('fitType')) {
            filters['fitType'] = { $in: filtersReq[i].fitType };
        }
    }
    return filters;
};
exports.adaptProductReqFilters = adaptProductReqFilters;
