
const log_helper = require("../components/log");

const logger= log_helper.get_logger();
const get_stack= log_helper.get_stack;
const web_config=require("../web_config");
const SECRET_CONFIG=web_config.SECRET_CONFIG;
let cacheLogin=require("../tools/token")


let sessionIsExist=async(ctx)=>{
    let username=await  ctx.session["USER"];
    if(username){
        return username
    }else{
        logger.info("session过期,请重新登陆");
         ctx.response.redirect("../login/index")
        return null
       
       
    }
}

const login_method= async(ctx,next)=>{ 
    await ctx.template("login",{},0);     
};
const index_method=async(ctx)=>{
      let username=await cacheLogin.sessionIsExist(ctx);
      if(username){

         await ctx.template("index",{username});
      }else{
         ctx.body="";
         ctx.response.redirect("../login/index")
      }
    //let key=JSON.stringify({DPPS_KY:006})
   /*  let key="access_token"
  let backData= await cacheLogin.getTokenMsg(ctx,key);
  console.log("返回的数据:",backData,get_stack()) */
   
    
    
}
let index_askForLeave=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("askForLeave/index_askForLeave",{username},10);
    }

}
let askForLeave_add=async(ctx)=>{
     await ctx.template("askForLeave/askforLeave_add",{},10);
}
let askForLeave_list=async(ctx)=>{
    await ctx.template("askForLeave/askforLeave_list",{},10);
}
let askForLeave_query=async(ctx)=>{
    await ctx.template("askForLeave/askforLeave_query",{},10);
}
let index_report=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("report/index_report",{username},10);
    }
}
let report_add=async(ctx)=>{
    await ctx.template("report/report_add",{},10);
}
let report_list=async(ctx)=>{
    await ctx.template("report/report_list",{},10);
}
let report_query=async(ctx)=>{
    await ctx.template("report/report_query",{},10);
}
let report_feedBack=async(ctx)=>{
    await ctx.template("report/report_feedBack",{},10);
}
let index_userInfo=async(ctx)=>{
     let session=await ctx.session['USER'];
     if(!session){
        ctx.redirect("../login/index")
     }
     let postData={
        m:"SELECT",
        SP_NAME:"SP_USER_VIEW_INFO",
        "DB_NAME":SECRET_CONFIG.DB_NAME,
        "EHUSER":session.DPPS_KY
     }
     let getData=await ctx.fetch(postData);
     logger.trace("index_userInfo得到的数据:",getData);
     getData[0].overplus=parseFloat(getData[0].APPLY_OT_HOUR-getData[0].USAGE_OT_HOUR).toFixed(1)
     await ctx.template("userInfo",{getData},10);
}
let index_password=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("password",{username},10);
    }
}
/* 加班 */
let index_overTime=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("overTime/index_overTime",{username},10);
    }
}
let overTime_add=async(ctx)=>{
    await ctx.template("overTime/overTime_add",{},10);
}
let overTime_list=async(ctx)=>{
    await ctx.template("overTime/overTime_list",{},10);
}
let overTime_query=async(ctx)=>{
    await ctx.template("overTime/overTime_query",{},10);
}
/* 报销模块 */
let index_reimburse=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("reimburse/index_reimburse",{username},10);
    }
}
let reimburse_add=async(ctx)=>{
    await ctx.template("reimburse/reimburse_add",{},10);
}
let reimburse_list=async(ctx)=>{
    await ctx.template("reimburse/reimburse_list",{},10);
}
let reimburse_query=async(ctx)=>{
    await ctx.template("reimburse/reimburse_query",{},10);
}
let reimburse_lookup=async(ctx)=>{
    await ctx.template("reimburse/reimbure_lookup",{},10);
}
/* 审核模块 */
let index_audited=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("audited/index_audited",{username},10);
    }
}
let audited_list=async(ctx)=>{
    await ctx.template("audited/auditedList",{},10); 
}
let audited_summary=async(ctx)=>{
    await ctx.template("audited/audited_summary",{},10); 
}

let audited_more=async(ctx)=>{
    await ctx.template("audited/moreAuditing",{},10);  
}
let audited_report=async(ctx)=>{
    await ctx.template("audited/audited_report",{},10);  
}
let audited_reimburse=async(ctx)=>{
    await ctx.template("audited/audited_reimburse",{},10);  
}
let audited_overtime=async(ctx)=>{
    await ctx.template("audited/audited_overTime",{},10);  
}
let audited_askForLeave=async(ctx)=>{
    await ctx.template("audited/audited_askForLeave",{},10);
}
/* other模块 */
let index_other=async(ctx)=>{
    let username=await sessionIsExist(ctx);
    if(username){
        await ctx.template("other/other_index",{username},10);
    }
}
let other_menu=async(ctx)=>{
    await ctx.template("other/other_menu",{},10);
}
let other_down=async(ctx)=>{
    await ctx.template("other/other_down",{},10);
}
let other_predown=async(ctx)=>{
    await ctx.template("other/other_preDown",{},10);
}
let skip=(ctx)=>{
    console.log("buhL:",ctx.request.origin)
    //ctx.response.redirect(ctx.request.origin+"/oa/index/index");
   // ctx.response.redirect(SECRET_CONFIG.redirect_uri)
}

module.exports= (router,app)=>{
    router.get("/login/index",login_method);
    router.get("/index/index",index_method);
    router.get("/index/askForLeave",index_askForLeave);
    router.get("/askforleave/add",askForLeave_add);
    router.get("/askforleave/list",askForLeave_list);
    router.get("/askforleave/query",askForLeave_query);
    router.get("/index/report",index_report);
    router.get("/report/add",report_add);
    router.get("/report/list",report_list);
    router.get("/report/query",report_query);
    router.get("/report/feedBack",report_feedBack);
    router.get("/index/userInfo",index_userInfo);
    router.get("/index/password",index_password);
    router.get("/index/overTime",index_overTime);
    router.get("/overTime/add",overTime_add);
    router.get("/overTime/list",overTime_list);
    router.get("/overTime/query",overTime_query);
    router.get("/index/reimburse",index_reimburse);
    router.get("/reimburse/add",reimburse_add);
    router.get("/reimburse/list",reimburse_list);
    router.get("/reimburse/query",reimburse_query); 
    router.get("/reimburse/lookup",reimburse_lookup);
    router.get("/index/audited",index_audited);
    router.get("/audited/list",audited_list);
    router.get("/audited/summary",audited_summary);
    router.get("/audited/more",audited_more);
    router.get("/audited/report",audited_report);
    router.get("/audited/reimburse",audited_reimburse);
    router.get("/audited/overTime",audited_overtime);
    router.get("/audited/askforleave",audited_askForLeave);
    router.get("/index/other",index_other);
    router.get("/other/menu",other_menu);
    router.get("/other/down",other_down);
    router.get("/other/preDown",other_predown);
    //router.get(["/","/index","/index/"],skip);
}