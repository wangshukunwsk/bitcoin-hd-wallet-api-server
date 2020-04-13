"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function ripemd160(buffer) {
    try {
        return crypto_1.createHash('rmd160')
            .update(buffer)
            .digest();
    }
    catch (err) {
        return crypto_1.createHash('ripemd160')
            .update(buffer)
            .digest();
    }
}
exports.ripemd160 = ripemd160;
function hash160(buffer) {
    return ripemd160(sha256(buffer));
}
exports.hash160 = hash160;
function sha256(buffer) {
    return crypto_1.createHash('sha256')
        .update(buffer)
        .digest();
}
exports.sha256 = sha256;
function hmacSHA512(key, data) {
    return crypto_1.createHmac('sha512', key)
        .update(data)
        .digest();
}
exports.hmacSHA512 = hmacSHA512;
//# sourceMappingURL=crypto.js.map