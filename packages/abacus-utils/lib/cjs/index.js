'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');
var address = require('@ethersproject/address');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
}

var DEFAULT_ASSET = {
    image_url: "",
    animation_url: "",
    permalink: "",
    asset_contract: {
        name: "",
        address: "",
    },
    collection: {
        name: "",
    },
    token_id: "",
    name: "",
};
function openseaGet(input, openSeaOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios__default["default"].get(openSeaOptions.url + input, {
                            decompress: false,
                            headers: openSeaOptions.api_key
                                ? {
                                    "X-API-KEY": openSeaOptions.api_key,
                                }
                                : {},
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.data];
                case 2:
                    e_1 = _a.sent();
                    console.log("e", e_1);
                    return [2 /*return*/, DEFAULT_ASSET];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function isOpenSeaAsset(asset) {
    return asset.token_id !== undefined;
}
function openseaGetMany(pricingSessions, options) {
    return __awaiter(this, void 0, void 0, function () {
        var URL, result, DEFAULT_OPENSEA_GET_RESPONSE;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    URL = "assets?" + pricingSessions
                        .map(function (session) { return "asset_contract_addresses=" + session.nftAddress + "&"; })
                        .toString() + pricingSessions
                        .map(function (session) { return "token_ids=" + session.tokenId + "&"; })
                        .toString();
                    return [4 /*yield*/, openseaGet(URL.replaceAll(",", ""), options)];
                case 1:
                    result = _a.sent();
                    if (isOpenSeaAsset(result)) {
                        DEFAULT_OPENSEA_GET_RESPONSE = {
                            assets: pricingSessions.map(function (session) { return (__assign(__assign({}, DEFAULT_ASSET), { asset_contract: __assign(__assign({}, DEFAULT_ASSET), { address: session.nftAddress }), token_id: session.tokenId })); }),
                        };
                        return [2 /*return*/, DEFAULT_OPENSEA_GET_RESPONSE];
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
var matchOpenSeaAssetToNFT = function (assets, session) {
    var ret = assets.find(function (asset) {
        return String(asset.asset_contract.address) === String(session.nftAddress) &&
            String(asset.token_id) === String(session.tokenId);
    });
    return ret;
};

function isAddress(value) {
    try {
        return address.getAddress(value);
    }
    catch (_a) {
        return false;
    }
}
function shortenAddress(address, chars) {
    if (chars === void 0) { chars = 4; }
    var parsed = isAddress(address);
    if (!parsed) {
        return "";
    }
    return parsed.substring(0, chars + 2) + "..." + parsed.substring(42 - chars);
}

exports.isAddress = isAddress;
exports.matchOpenSeaAssetToNFT = matchOpenSeaAssetToNFT;
exports.openseaGet = openseaGet;
exports.openseaGetMany = openseaGetMany;
exports.shortenAddress = shortenAddress;
//# sourceMappingURL=index.js.map
