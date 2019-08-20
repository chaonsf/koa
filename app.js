
const Koa = require("koa");
const app = new Koa();
const controller= require("./components/controller");
const session =require("./components/session");
const static_server= require("./components/static_server");
const template= require("./components/template");
const fetch_wrap= require("./tools/fetch");
const third= require("./components/third_help");
const cors=require("koa-cors");
app.use(cors({
    origin:"http://localhost:8080",
    credentials:true
}))
//setup static_sever
static_server.setup_static_server(app);

//setup session
session.setup_session(app);

///setup fetch
fetch_wrap.setup_fetch(app);

//setup router
controller.setup_router(app);

//setup backend template
template.setup_template(app);



//other function setup
third.setup_third(app);

let $port= 2203;

app.silent= (app.env!="development");
app.listen($port);

app.on("error",(err,ctx)=>{
    var logger= require("./components/log").get_logger();
    logger.error("未捕获错误","\nerr=>",err,"\nctx=>",ctx);

})

if(app.env=="development")
{
    console.log(`serve -> http://localhost:${$port}`);
}
  