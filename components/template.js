const tpl= require("art-template");
const _moment= require("moment");
const path= require("path");
const web_config= require("../web_config");

//, artRule
tpl.defaults.rules= tpl.defaults.rules.slice(0,1) ;

tpl.defaults.imports.dateFormat = (date, format)=>{
    format= format || "YYYY-MM-DD HH:mm:ss";
    return moment(date).format(format);
};
tpl.defaults.imports.extname='';

module.exports.setup_template = (app)=>{
    tpl.defaults.debug= (app.env=="development");
    
    app.template= app.context.template = async function(fileName,data,maxage){
       let that_app= this;
       if(that_app.ctx){
           that_app= that_app.ctx;
       }
       fileName +=  path.extname(fileName)=="" ? ".html" :"";  
       let fullPath = path.join(web_config.VIEWS_PATH,fileName);
       that_app.type= "text/html;charset=utf-8";
       if(data instanceof Function)
        {
            data= await data()

        }
       that_app.body =  tpl(fullPath,data);
       if(maxage)
       {
            that_app.set("Cache-Control","max-age="+ maxage);

       }
   };

} 

