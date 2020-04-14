const router = require('koa-router')();
import * as controller from './controller';

router.prefix('/api');

router.post('/gensegwitaddress',controller.genSegwitAddress);

router.post('/genP2PKHaddress',controller.genP2PKHAddress);

router.post('/genmultisigaddress',controller.genMultiSigAddress);

module.exports=router;