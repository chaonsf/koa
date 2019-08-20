const log_helper = require("../components/log");
const logger= log_helper.get_logger();
const get_stack= log_helper.get_stack;

module.exports=class{
    constructor(cfg){
        this.cfg=cfg;
    }
    getParam(){
        let midParam={
            RedisDbName:this.cfg.RedisDbName,
            RedisCommand:this.cfg.RedisCommand,
            DbNumber:this.cfg.DbNumber
        }
       return midParam
    }
   async getResult(ctx,param){
       try {
         let midParam=this.getParam();
         let postData=Object.assign(midParam,param);
         let url=this.cfg.URL;
         let data=await ctx.fetch(postData,url);
          return data
       } catch (error) {
           logger.error(error.message,get_stack());
           return {
            RETURN_CODE:99,
            RETURN_MESSAGE:error.message
           }
       }

    }
   async getToken(ctx,param){
        let data=await this.getResult(ctx,param)
        return data
    }
    async delToken(ctx,param){
        let data=await this.getResult(ctx,param)
        return data
    }
    async setToken(ctx,param){
        let data=await this.getResult(ctx,param)
        return data
    }
}