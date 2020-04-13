const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const _router =require('./router');
const fs = require('fs');
const path = require('path');
const https = require('https');

app.use(bodyParser({
    enableTypes:['json', 'form', 'text']
  }));
app.use(json());

app.use(_router.routes(),_router.allowedMethods());
 
app.on("error",(err:any,ctx:any)=>{
  console.log(new Date(),":",err);
});

var sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname,'../ssl/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname,'../ssl/cert.pem'))
};

https.createServer(sslOptions, app.callback()).listen(443);