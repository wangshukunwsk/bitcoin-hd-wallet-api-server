"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('koa-router')();
const controller = require("./controller");
router.prefix('/api');
router.post('/gensegwitaddress', controller.genSegwitAddress);
router.post('/genmultisigaddress', controller.genMultiSigAddress);
module.exports = router;
//# sourceMappingURL=router.js.map