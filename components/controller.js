const Router= require("koa-router");
const router = new Router();
let that_app;


const all_routers= ()=>{
    require("../controller/loadHtml")(router,that_app);
    require("../controller/api")(router,that_app);
    require("../controller/file")(router,that_app);
}

const setup_router= (app)=>{
    that_app= app;
    all_routers();
    app.use(router.routes()).use(router.allowedMethods());
};

module.exports.setup_router= setup_router;