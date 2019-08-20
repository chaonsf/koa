const log_helper = require("../components/log");
const logger= log_helper.get_logger();
const get_stack= log_helper.get_stack;
const web_config=require("../web_config");
const SECRET_CONFIG=web_config.SECRET_CONFIG;
let cacheToken=require("../tools/cacheToken");

let setting={
    RedisDbName:"dental_shop",
    RedisCommand:"RandToken",
    DbNumber:SECRET_CONFIG.CACHE_NUMBER,
    URL:SECRET_CONFIG.CACHE_URL
}
let memoryToken=new cacheToken(setting);
let cacheLogin={
     async sessionIsExist(ctx){
        try {
            let username=await  ctx.session["USER"];
            if(username){
                return username
            }else{
                let urlParam=ctx.request.query;
                let accessToken=urlParam['access_token'];
                logger.trace("acc:",accessToken)
                if(accessToken){ 
                let backData=await cacheLogin.getTokenMsg(ctx,accessToken);
                logger.trace("redis获取accessToken得到的反馈:",backData)
                   if(backData){
                       return backData
                   }else{
                       return null
                   }
                }else{
                    return null
                }
            } 
        } catch (error) {
              logger.error(error,get_stack());
              return null;
           }

     },
    async getTokenMsg(ctx,accessToken){
        try {
            let getParam={
                m:"get",
                Key:accessToken
            }
            let getData=await memoryToken.getToken(ctx,getParam);
            logger.trace("获得Token数据:",getData);
            if(getData.RETURN_CODE==0&&getData.result){
                  let dpps=JSON.parse(getData.result).DPPS_KY;
                  let backData=await cacheLogin.isTrueMessage(ctx,dpps);
                  if(backData){
                      let delParam={
                        m:"keydel",
                        Key:accessToken
                      }
                      let delData=await memoryToken.delToken(ctx,delParam) 
                      logger.trace("删除Token数据:",delData);
                     return backData 
    
                  }else{
                      return null
                  }
            }else{
                return null
            }
            
        } catch (error) {
            logger.error(error.message,get_stack());
            return null;
        }

     },
     async isTrueMessage(ctx,dpps){
         try {
            let midparam={
                "DB_NAME":SECRET_CONFIG.DB_NAME,
                "SP_NAME":'SP_VERIFY_LOAD',
                "EHUSER":dpps,
                "SIMPLE_MODE":"N",
                "m":"multi_result"
              }
              let data=await ctx.fetch(midparam);
              logger.trace("验证用户真实性结果：",data);
              if(data.result.RETURN_CODE==0){
                ctx.session.USER=data.meme_info;
                ctx.session.email=data.meme_info.MEME_EMAIL;
                logger.trace("邮箱:",data.meme_info.MEME_EMAIL)
               let userInfo=data.meme_info
                  return userInfo
              }else{
                  return false
              }
             
         } catch (error) {
             logger.error(error.message,get_stack());
             return false
         }

     },
     async setToken(ctx,accessToken){
         let midparam={
             Key:"access_token",
             Value:accessToken,
             Expire:"1h",
             Overwrite:true,
             m:"set"
         }
         let data=await memoryToken.setToken(ctx,midparam);
         logger.trace("设置结果:",data)
     }
}
module.exports=cacheLogin