"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("./crypto");
const bech32 = require("bech32");
const hdwallet_node_1 = require("./hdwallet-node");
const p2ms = require("./p2Multisig");
const bs58check = require('bs58check');
var AddressType;
(function (AddressType) {
    AddressType[AddressType["P2PKH"] = 0] = "P2PKH";
    AddressType[AddressType["P2WPKH"] = 1] = "P2WPKH";
})(AddressType || (AddressType = {}));
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
 * generate legacy P2PKH address from public key
 * @param pubkey public key
 */
function getP2PKHAddress(pubkey) {
    let hash = crypto.hash160(pubkey);
    let payload = Buffer.allocUnsafe(21);
    const pubKeyHash = 0x00;
    payload.writeUInt8(pubKeyHash, 0);
    hash.copy(payload, 1);
    return bs58check.encode(payload);
}
/**
 * Generate a Hierarchical Deterministic (HD) bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 * @param addressType legacy P2PKH address or Segregated Witness address
 */
function generateHDWalletAddress(seed, path, addressType) {
    let bSeed = Buffer.from(seed, 'hex');
    let rootNode = hdwallet_node_1.createHDRootNodeFromSeed(bSeed);
    let childNode = rootNode.derivePath(path);
    if (addressType == AddressType.P2PKH)
        return getP2PKHAddress(childNode.publicKey);
    else
        return getP2wpkhAddress(childNode.publicKey);
}
/**
 * Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
function generateSegWitAddress(seed, path) {
    return generateHDWalletAddress(seed, path, AddressType.P2WPKH);
}
exports.generateSegWitAddress = generateSegWitAddress;
/**
 * Generate a Hierarchical Deterministic (HD) Legacy P2PKH bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
function generateP2PKHAddress(seed, path) {
    return generateHDWalletAddress(seed, path, AddressType.P2PKH);
}
exports.generateP2PKHAddress = generateP2PKHAddress;
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