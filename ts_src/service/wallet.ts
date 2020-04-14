import * as crypto from './crypto';
import * as bech32 from 'bech32';
import { HDWalletNodeInterface, createHDRootNodeFromSeed } from './hdwallet-node';
import * as p2ms from './p2Multisig';
const bs58check = require('bs58check');

enum AddressType{
    P2PKH,
    P2WPKH
}

/**
 * generate Segregated Witness address from public key
 * @param pubkey public key
 */
function getP2wpkhAddress(pubkey:Buffer):string{
    let hash=crypto.hash160(pubkey);
    let words = bech32.toWords(hash);
    words.unshift(0x00);
    return bech32.encode('bc', words);
}

/**
 * generate legacy P2PKH address from public key
 * @param pubkey public key
 */
function getP2PKHAddress(pubkey:Buffer):string{
    let hash=crypto.hash160(pubkey);
    let payload:Buffer = Buffer.allocUnsafe(21);
    const pubKeyHash=0x00;
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
function generateHDWalletAddress(seed:string,path:string,addressType:AddressType) :string|undefined {
        
    let bSeed:Buffer= Buffer.from(
        seed,
        'hex',
      );
    let rootNode:HDWalletNodeInterface=createHDRootNodeFromSeed(bSeed);
    
    let childNode=rootNode.derivePath(path);
    if (addressType==AddressType.P2PKH)
        return getP2PKHAddress(childNode.publicKey as Buffer);
    else
        return getP2wpkhAddress(childNode.publicKey as Buffer);
}

/**
 * Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
function generateSegWitAddress(seed:string,path:string) :string|undefined {
    return generateHDWalletAddress(seed,path,AddressType.P2WPKH)
}

/**
 * Generate a Hierarchical Deterministic (HD) Legacy P2PKH bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
function generateP2PKHAddress(seed:string,path:string) :string|undefined {
    return generateHDWalletAddress(seed,path,AddressType.P2PKH)
}

/**
 * create a multi signature address
 * @param pubkeys the public keys of all the participants
 * @param m the amount of signatures required to release the coins
 */
function generateMultiSigP2SHAddress(pubkeys:string[],m:number):string|undefined
{
    let bPubKyes=pubkeys.map(skey=>Buffer.from(skey,'hex'));
    return p2ms.generateP2MSAddress(bPubKyes,m);
}

export {
    generateSegWitAddress,
    generateP2PKHAddress,
    generateMultiSigP2SHAddress
}

