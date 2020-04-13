const router = require('koa-router')();
import * as controller from './controller';

router.prefix('/api');

router.post('/gensegwitaddress',controller.genSegwitAddress);

router.post('/genmultisigaddress',controller.genMultiSigAddress);

module.exports=router;