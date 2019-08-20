/* 配置参数看不懂可以看markdown文档 */
module.exports= {
    ROOT_PATH: __dirname,
    VIEWS_PATH: __dirname + "\\static\\views" ,
    loggerLevel:true,   //为true为全部显示，false为显示debug以上的
    SECRET_CONFIG:{
        "KEY":"SAASINSU",
        "IV":"520Gg520",
        "DB_NAME":"OA_PROD",
        "POST_URL":"http://139.196.108.200/BFInsuredPlatInterface",
         "UPLOAD_URL":"http://139.196.108.200/BFInsuredPlatInterface/FileUpload.aspx",
         "DOWNLOAD_URL":"http://139.196.108.200/BFInsuredPlatInterface/FileTransmit.aspx",
         "CACHE_URL":"http://139.196.108.200/BFInsuredPlatInterface/CacheFactory.aspx",
         "CACHE_NUMBER":15,
         "redirect_uri":"http://139.196.108.200/oa/index/index",
    },
    EMAIL_CONFIG:{
         host:"smtp.mxhichina.com",
         port:465,
         secureConnection:true,
         auth:{
            user:"chao.li@powerfultone.com",
            pass:"Bft543216"
         }
    }
}