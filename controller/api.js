const koaBody= require("koa-body");
const log_helper = require("../components/log");
const logger= log_helper.get_logger();
const get_stack= log_helper.get_stack;
const web_config=require("../web_config");
const SECRET_CONFIG=web_config.SECRET_CONFIG;

let api_preLogin=async(ctx)=>{
      try {
         let postData=ctx.request.body;
         logger.trace("api_preLogin接收到前台的参数:",postData);
         let parameter={
            "EHUSER":'0',
            "DB_NAME":SECRET_CONFIG.DB_NAME
         }
         let finalParam=Object.assign(postData,parameter);
         let data=await ctx.fetch(finalParam).then(ret=>{
              logger.trace("api_preLogin接收到后台的参数:",ret);
              if(ret.result.RETURN_CODE==0){
                return{
                    RETURN_CODE:0,
                    RETURN_MESSAGE:ret.result.RETURN_MESSAGE,
                    result:{
                        meme_info:ret.meme_info,
                        group_account:ret.group_account
                    }
                }
            }else{
                return{
                    RETURN_CODE:99,
                    RETURN_MESSAGE:ret.result.RETURN_MESSAGE
                }
            }
         })
         ctx.body=data
      } catch (error) {
          logger.error(error.message,get_stack());
          ctx.body={
            RETURN_CODE:99,
            RETURN_MESSAGE:error.message 
          }
        return
      }
}

let api_login=async(ctx)=>{
      try {
          let postData=ctx.request.body;
          logger.trace("api_login接收前台的参数:",postData);
          let paramter={
            "DB_NAME":SECRET_CONFIG.DB_NAME,
            "SP_NAME":'SP_USER_LOGIN',
            "m":"UALIDATE",
            "EHUSER":"0"
          }
          let finalParam=Object.assign(postData,paramter);
          let data=await ctx.fetch(finalParam).then(ret=>{
               logger.trace("api_login接收到的后台的数据：",ret);
               if(ret.RETURN_CODE==0){
                   ctx.session.email=ret.MEME_EMAIL;
                return {
                   "EHUSER":ret.EHUSER,
                   'result':{
                       RETURN_CODE:0,
                       RETURN_MESSAGE:ret.RETURN_MESSAGE,
                       EHUSER:ret.EHUSER,
                       
                   }
                }
             }else{
                 throw new Error(ret.RETURN_MESSAGE)
              }
          })
          let param={
            "EHUSER":data.EHUSER,
            'm':"SELECT",
            "DB_NAME":SECRET_CONFIG.DB_NAME,
            "SP_NAME":'SP_USER_VIEW_INFO',
          }
          let sessionData=await ctx.fetch(param);
           logger.info("记下的session数据:",sessionData[0]);
            ctx.session.USER=sessionData[0];
            logger.trace("api_login传给前台的数据:",data.result);
            ctx.body=data.result;
      } catch (error) {
           logger.error(error.message,get_stack());
           ctx.body={
              RETURN_CODE:99,
              RETURN_MESSAGE:error.message 
           }
           return
      }
}
let api_json=async(ctx)=>{
      try {
          let session=await ctx.session['USER'];
          if(!session){
              throw new Error("session过期，请重新登陆");
          }
          let postData=ctx.request.body;
          logger.trace("api_json接收到前台的参数:",postData);
          if(postData["rows"]&&postData["page"]){
            postData['adpter_fill_all']="1"
           }
          let parameter={
            "DB_NAME":SECRET_CONFIG.DB_NAME,
            "EHUSER":postData.EHUSER|| session.DPPS_KY
          }
          let finalParam=Object.assign(postData,parameter);
           let data=await ctx.fetch(finalParam);
           logger.trace('api_json传给前台数据:',data);
           ctx.body=data;
      } catch (error) {
          logger.error(error.message,get_stack());
          ctx.body={
            RETURN_CODE:99,
            RETURN_MESSAGE:error.message  
          }
          return 
      }
}

let api_logout=async(ctx)=>{
     try {
          ctx.session=null;
          ctx.body={
             RETURN_CODE:"0",
             RETURN_MESSAGE:"退出成功"
          }

     } catch (error) {
        logger.error(error.message,get_stack());
        ctx.body={
            RETURN_CODE:99,
            RETURN_MESSAGE:error.message   
        }
     }
}


module.exports= (router,app)=>{
     router.post("/api/preLogin",koaBody(),api_preLogin);
     router.post("/api/login",koaBody(),api_login);
     router.post('/api/json',koaBody(),api_json);
     router.post('/api/logout',koaBody(),api_logout);
    
}