const session= require("koa-session");

module.exports.setup_session= (app)=>{
   app.keys = ['koa-session'];
   app.use(session( {
            key:"koa-sessionid",
            maxAge: 86400000,   //有效期
   },app));
}