const static_server= require('koa-static-server');
module.exports.setup_static_server= (app)=>{
    if(app.env=="development"){
        const _server = static_server({
            rootDir: './static', rootPath: '/static'
        });
        app.use(_server);
       

    }

}