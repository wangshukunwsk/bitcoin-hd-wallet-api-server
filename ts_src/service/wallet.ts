import * as crypto from './crypto';
import * as bech32 from 'bech32';
import { HDWalletNodeInterface, createHDRootNodeFromSeed } from './hdwallet-node';
import * as p2ms from './p2Multisig';

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
 * Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
function generateSegWitAddress(seed:string,path:string) :string|undefined {
        
    let bSeed:Buffer= Buffer.from(
        seed,
        'hex',
      );
    let rootNode:HDWalletNodeInterface=createHDRootNodeFromSeed(bSeed);
    
    let childNode=rootNode.derivePath(path);
    
    return getP2wpkhAddress(childNode.publicKey as Buffer);
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
    generateMultiSigP2SHAddress
}

