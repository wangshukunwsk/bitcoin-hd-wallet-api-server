import * as wallet from './service/wallet';


/**
 * generate segwit address
 * @param ctx Parameters passed by json in request body: {seed:string,path:string}, seed is hex string
 */
async function genSegwitAddress(ctx:any){
    let reqData=ctx.request.body;
    let address=wallet.generateSegWitAddress(reqData.seed,reqData.path);
    ctx.body={
        address
    };
}

/**
 * generate legacy p2pkh address
 * @param ctx Parameters passed by json in request body: {seed:string,path:string}, seed is hex string
 */
async function genP2PKHAddress(ctx:any){
    let reqData=ctx.request.body;
    let address=wallet.generateP2PKHAddress(reqData.seed,reqData.path);
    ctx.body={
        address
    };
}

/**
 * generate multi signature address
 * @param ctx Parameters passed by json in request body: {pubkeys:string[],m:number}
 */
async function genMultiSigAddress(ctx:any){
    let reqData=ctx.request.body;
    let address=wallet.generateMultiSigP2SHAddress(reqData.pubkeys,reqData.m);
    ctx.body={
        address
    };
}


export {
    genSegwitAddress,
    genMultiSigAddress
}