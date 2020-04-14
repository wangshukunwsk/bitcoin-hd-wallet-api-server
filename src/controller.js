"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet = require("./service/wallet");
/**
 * generate segwit address
 * @param ctx Parameters passed by json in request body: {seed:string,path:string}, seed is hex string
 */
function genSegwitAddress(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqData = ctx.request.body;
        let address = wallet.generateSegWitAddress(reqData.seed, reqData.path);
        ctx.body = {
            address
        };
    });
}
exports.genSegwitAddress = genSegwitAddress;
/**
 * generate legacy p2pkh address
 * @param ctx Parameters passed by json in request body: {seed:string,path:string}, seed is hex string
 */
function genP2PKHAddress(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqData = ctx.request.body;
        let address = wallet.generateP2PKHAddress(reqData.seed, reqData.path);
        ctx.body = {
            address
        };
    });
}
exports.genP2PKHAddress = genP2PKHAddress;
/**
 * generate multi signature address
 * @param ctx Parameters passed by json in request body: {pubkeys:string[],m:number}
 */
function genMultiSigAddress(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let reqData = ctx.request.body;
        let address = wallet.generateMultiSigP2SHAddress(reqData.pubkeys, reqData.m);
        ctx.body = {
            address
        };
    });
}
exports.genMultiSigAddress = genMultiSigAddress;
//# sourceMappingURL=controller.js.map