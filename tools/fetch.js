const way_crypto=require('./encrypt');
const md5=require('md5');
const fetch=require("node-fetch");
const web_config= require("../web_config");
const secret_config= web_config.SECRET_CONFIG;
const log_helper = require("../components/log");
const logger= log_helper.get_logger();
const get_stack= log_helper.get_stack;
const key= secret_config.KEY,
      iv= secret_config.IV;
      post_url= secret_config.POST_URL;

const make_sign= (text)=>md5(text + key).toLocaleLowerCase().replace("-","");

const kfetch= async(param,url)=>{
    if(typeof param !=='string'){
        param=JSON.stringify(param)
    }

    let encryptData=way_crypto.encypt(param,key,iv);
    let requestToken= make_sign(param);
    url= url || post_url;
    let data=await fetch(url,{
        method:"POST",
        body:encryptData,
        headers:{
            'Content-Type':'application/json',
            "REQUEST_TOKEN": requestToken
        }
    }).then(res=>res.text()).then(text=>JSON.parse(way_crypto.decrtpt(text,key,iv)))
    .catch(ex=>{
        logger.error(ex,get_stack())
        return {
            RETURN_CODE: 99,
            RETURN_MESSAGE:"交互异常"
         }
    });
    return data
}

module.exports={
    make_sign:make_sign,
    setup_fetch:(app)=>{
        app.fetch = app.context.fetch= kfetch;
    }
}