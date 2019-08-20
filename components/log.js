const log4js= require("log4js");
const path= require("path");
const web_config=require("../web_config");
const loggerLevel=web_config.loggerLevel;
log4js.configure({
    appenders:{
        ruleConsole: { type: "console", level: "all", layout:{type: "pattern", pattern:"%d %p %c  %m%n"} },
        datefile: { type: "dateFile", level:"all", 
                     absolute:true, alwaysIncludePattern:true, 
                     filename: path.join(__dirname,"../out_log")+"\\",
                     pattern:"yyMMdd.log", 
                     encoding: "utf-8",
                     layout:{type: "pattern", pattern:"%d %p %c  %m%n"} 
                    }
    },
    categories: {
       // default: {appenders: ["ruleConsole","datefile"], level: "all"}
       default: {appenders: ["ruleConsole","datefile"], level:loggerLevel?"all":"DEBUG"}
    }
});

module.exports= {
    log4js: log4js,
    get_logger: (catalog)=>{
        catalog= catalog || "default";
        return log4js.getLogger(catalog);
    },
    get_stack:()=>{
        let _m={};
        Error.captureStackTrace(_m,_m)
        let str= _m.stack.toString();
        const _arr= str.split(/[\r\n]/);
        if(_arr.length && _arr.length>1){
            let _s= _arr.length>2 ? _arr[2] : _arr.length[1];
            _s= _s.replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n]/g, "");
            return "{\"stack\":\"" + _s+"\"}";
        }
        else{
            return "";
        }
        
    }
}

