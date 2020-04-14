/**
 * Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
declare function generateSegWitAddress(seed: string, path: string): string | undefined;
/**
 * Generate a Hierarchical Deterministic (HD) Legacy P2PKH bitcoin address from a given seed and path
 * @param seed the seed to generate master key
 * @param path the path of child, it follw BIP32
 */
declare function generateP2PKHAddress(seed: string, path: string): string | undefined;
/**
 * create a multi signature address
 * @param pubkeys the public keys of all the participants
 * @param m the amount of signatures required to release the coins
 */
declare function generateMultiSigP2SHAddress(pubkeys: string[], m: number): string | undefined;
export { generateSegWitAddress, generateP2PKHAddress, generateMultiSigP2SHAddress };
