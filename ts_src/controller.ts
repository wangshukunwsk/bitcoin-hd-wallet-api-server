import * as wallet from './service/wallet';
import { pathToFileURL } from 'url';
import { createHDRootNodeFromSeed } from './service/hdwallet-node';


async function genSegwitAddress(ctx:any){
    let reqData=ctx.request.body;
    let address=wallet.generateSegWitAddress(reqData.seed,reqData.path);
    ctx.body={
        address
    };
}

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