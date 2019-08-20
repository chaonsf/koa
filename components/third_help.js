
module.exports.setup_third= (app)=>{
    app.context.json= function(data){
          let that_ctx= this;
          if(that_ctx.ctx)
          {
            that_ctx= that_ctx.ctx;
          }
          if(!data)
          {
            that_ctx.body= "";
            that_ctx.type= "text/plain;charset=utf-8";
          }

          let _json= data;
          if(_json instanceof Object)
          {
             _json= JSON.stringify(_json);   
          }
          that_ctx.body= _json;
          that_ctx.type= "application/json;charset=utf-8";

    }
}