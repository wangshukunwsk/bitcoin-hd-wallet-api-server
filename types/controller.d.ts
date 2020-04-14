/**
 * generate segwit address
 * @param ctx Parameters passed by json in request body: {seed:string,path:string}, seed is hex string
 */
declare function genSegwitAddress(ctx: any): Promise<void>;
/**
 * generate multi signature address
 * @param ctx Parameters passed by json in request body: {pubkeys:string[],m:number}
 */
declare function genMultiSigAddress(ctx: any): Promise<void>;
export { genSegwitAddress, genMultiSigAddress };
