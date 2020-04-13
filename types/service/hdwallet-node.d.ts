/// <reference types="node" />
/**
 * HD Wallet Node Interface
 */
export interface HDWalletNodeInterface {
    privateKey: Buffer | undefined;
    chainCode: Buffer;
    publicKey: Buffer | undefined;
    derivePath(path: string): HDWalletNodeInterface;
}
/**
 * create root node of Hierarchical Deterministic from seed
 * @param seed
 */
export declare function createHDRootNodeFromSeed(seed: Buffer): HDWalletNodeInterface;
