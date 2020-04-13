/// <reference types="node" />
/**
 * create a multi signature address.
 * @param pubkeys  the public keys of all the participants
 * @param m the amount of signatures required to release the coins
 */
export declare function generateP2MSAddress(pubkeys: Buffer[], m: number): string;
