"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("./crypto");
const bech32 = require("bech32");
const hdwallet_node_1 = require("./hdwallet-node");
const p2ms = require("./p2Multisig");
/**
 * generate Segregated Witness address from public key
 * @param pubkey public key
 */
function getP2wpkhAddress(pubkey) {
    let hash = crypto.hash160(pubkey);
    let words = bech32.toWords(hash);
    words.unshift(0x00);
    return bech32.encode('bc', words);
}
/**
 * Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
function generateSegWitAddress(seed, path) {
    let bSeed = Buffer.from(seed, 'hex');
    let rootNode = hdwallet_node_1.createHDRootNodeFromSeed(bSeed);
    let childNode = rootNode.derivePath(path);
    return getP2wpkhAddress(childNode.publicKey);
}
exports.generateSegWitAddress = generateSegWitAddress;
/**
 * create a multi signature address
 * @param pubkeys the public keys of all the participants
 * @param m the amount of signatures required to release the coins
 */
function generateMultiSigP2SHAddress(pubkeys, m) {
    let bPubKyes = pubkeys.map(skey => Buffer.from(skey, 'hex'));
    return p2ms.generateP2MSAddress(bPubKyes, m);
}
exports.generateMultiSigP2SHAddress = generateMultiSigP2SHAddress;
//# sourceMappingURL=wallet.js.map