const koaBody= require("koa-body");
const log_helper = require("../components/log");
const logger= log_helper.get_logger();
const get_stack= log_helper.get_stack;
const web_config=require("../web_config");
const SECRET_CONFIG=web_config.SECRET_CONFIG;
const path=require("path");
const form_data=require("form-data");
const md5=require('md5');
const fs=require('fs');
const fetch=require("node-fetch");
const ejsexcel=require("ejsexcel");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const nodemailer = require('nodemailer');
const emailConfig=web_config.EMAIL_CONFIG;
let transporter=nodemailer.createTransport(emailConfig)

let config={
    multipart: true,   //支持文件上传
    strict  : false,  //如果为true，不解析GET,HEAD,DELETE请求
    formidable: {
         uploadDir:path.join(__dirname,'../runtime'),
         keepExtensions: true,    // 保持文件的后缀
         maxFileSize: 10*1024*1024,
         onFileBegin:(name,file)=>{
             const dir=path.join(__dirname,'../runtime');
             if(!fs.existsSync(dir)){
                 fs.mkdirSync(dir)
             }
         },
         onError:(err)=>{
             logger.error(err.message,get_stack())
         } 
    }
}
let afterUpload=async (postData,storage,ctx)=>{
    try {
        let session=await ctx.session['USER'];
        let obj={
            "DB_NAME":SECRET_CONFIG.DB_NAME,
            "SP_NAME":"SP_IMIM_IMAGE_INFO_INSERT",
            "m":"INSERT",
            "EHUSER":session.DPPS_KY,
            "IMIM_NAME_PATH":storage.RETURN_RESULT[0]
        }
        let postArr={
            "SYS_KY":postData.SYS_KY,
            "SYS_KY_TYPE":postData.SYS_KY_TYPE
        }
         let allData=Object.assign(postArr,obj);
         logger.info("传给后台的数据:",allData,get_stack());
         let backData=await ctx.fetch(allData);
         logger.info("得到的结果:",backData,get_stack())
         return backData
        
    } catch (error) {
         logger.error(error.message,get_stack());
         return {
            RETURN_CODE: 99,
            RETURN_MESSAGE:error.message
         }
    }

}
let file_upload=async(ctx,next)=>{
     try {
         let file=ctx.request.files;
         let data=fs.createReadStream(file.file.path);
         let postData=ctx.request.body;
         logger.info("file:",file.file.path)
         logger.trace("postData:",postData)
        let random=(Math.random()*100).toFixed(2);
        let requestToken=md5(random+SECRET_CONFIG.KEY).toLocaleLowerCase().replace("-","");
        let url=SECRET_CONFIG.UPLOAD_URL+"?nonstr="+random;
        let form = new form_data();
        form.append("file",data);
        var headers=form.getHeaders();
        headers['REQUEST_TOKEN']=requestToken;
        let storage=await fetch(url,{
            method:"POST",
            body:form,
            headers:headers,
        }).then(res=>res.json()).then(json=>json)
        .catch(ex=>{
             logger.error(ex,get_stack());
             return {
              RETURN_CODE: 99,
              RETURN_MESSAGE:"交互异常"
       }
      });
       logger.info("图片上传结果:",storage)
       if(storage.RETURN_CODE==0){
       /*   fs.unlink(file.file.path,(error)=>{
             if(error) throw error
         })  删除文件 */
       let result=await  afterUpload(postData,storage,ctx) ;
          ctx.body=result
       }else{
        throw new Error(storage.RETURN_MESSAGE)
       }

     } catch (error) {
        logger.error(error,get_stack());
        ctx.body={
            RETURN_CODE: 99, 
            RETURN_MESSAGE:error.message
        };
        return;
     }
}
 
let file_downLoad=async(ctx)=>{
    try {
        console.log("sdaasd:",ctx.request.query)
        let ways=ctx.request.query["fileName"];
        logger.info("图片位置:",ways);
        let url=SECRET_CONFIG.DOWNLOAD_URL+"?fileName="+ways;
        let encrypt=md5(ways+SECRET_CONFIG.KEY).toLocaleLowerCase().replace("-","");
        let data=await fetch(url,{
            method:"GET",
            headers:{
                "REQUEST_TOKEN":encrypt
            },
        }).then(res=>{
            if(res.headers.get("RETURN_CODE")==0){
                return res.buffer()
           }
           return null;
        }).then(text=>text)
        .catch(ex=>{
             logger.error(ex,get_stack());
            return {
                RETURN_CODE: 99,
                RETURN_MESSAGE:"交互异常"
             }
        });
        
      if(data){
          ctx.body=data;
          ctx.length=data.length;
      }else{
         ctx.status=500;
         ctx.body=""
      }
    } catch (error) {
        logger.error(error.stack);
         ctx.body=error.message;
         return ;
    }
}
let convertkey=(arr,key)=>{
    try {
        let newArr=[];
        arr.forEach((item,index)=>{
            let newObj={};
            for(let i=0;i<key.length;i++){
                newObj[key[i]] = item[Object.keys(item)[i]]
            }
            newArr.push(newObj);
        })
        return newArr;
        
    } catch (error) {
        logger.error(error.message,get_stack());
        return [];
    }

}
let SendEmail=async(mailOptions)=>{
     function result(){
         return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    reject(error)
                }
                resolve(true)
            })
         })
     }
    let data=await result();
    return data
}
let file_otherPreDown=async(ctx)=>{
     try {
        let session=await ctx.session['USER'];
        const exlBuf = await readFileAsync("./example.xlsx");
        if(!session){
            throw new Error("session过期，请重新登陆");
        }
        let postData=ctx.request.body;
        logger.trace("其他模块下载接收参数:",postData);
        let parameter={
            "DB_NAME":SECRET_CONFIG.DB_NAME,
             "m":"select",
            "SP_NAME":"SP_PERSON_EXPS_DOWN",
            "EHUSER":postData.EHUSER|| session.DPPS_KY
        }
        let finalParam=Object.assign(postData,parameter);
        let arr=await ctx.fetch(finalParam);
        logger.trace('file_otherPreDown得到数据:',arr);
         let data=convertkey(arr,['GPGP_NAME','TYPE','money','desc','date']);
         let total=0;
         for(let i=0;i<data.length;i++){
            total+=Number(data[i].money)
         }
         total=total.toFixed(2);
         let endData=[[{"total":total}],data]
        let date=new Date();
        let name="报销单"+date.getTime()+".xlsx";
        const exlBuf2 = await ejsexcel.renderExcel(exlBuf,endData);
        await writeFileAsync("./static/document/"+name, exlBuf2);
        if(postData.EMAIL){
            //说明是发送邮箱
            let email=await ctx.session["email"];
            var mailOptions={
                from:emailConfig.auth.user,
                to:email,
                subject:"报销单邮箱寄送",
                html:`<p>报表在附件中，请注意查收</p>`,
                attachments:[
                    {filename:name,
                     path:"./static/document/"+name}
                ]
            }
            let boff=await SendEmail(mailOptions);
             if(boff){
                //发送成功
                ctx.body={
                    RETURN_CODE:0,
                    RETURN_MESSAGE:"发送成功"
                }
             }

        }else{
            //下载报销单
            ctx.body={
                RETURN_CODE:0,
                href:"../static/document/"+name
            }
        }
       
     } catch (error) {
        logger.error(error.stack);
        ctx.body=error.message;
        return ;
     }
}


module.exports= (router,app)=>{
    router.post("/file/Upload",koaBody(config),file_upload);
    router.get("/file/Transmit",file_downLoad);
    router.post("/file/PepairReportExps",koaBody(),file_otherPreDown);//其他模块的下载和发送报销单接口
    
   
}