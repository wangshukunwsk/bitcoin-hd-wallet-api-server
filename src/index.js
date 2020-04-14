"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const _router = require('./router');
const fs = require('fs');
const path = require('path');
const https = require('https');
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
}));
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(_router.routes(), _router.allowedMethods());
app.on("error", (err, ctx) => {
    console.log(new Date(), ":", err);
});
var sslOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'))
};
https.createServer(sslOptions, app.callback()).listen(443);
//# sourceMappingURL=index.js.map