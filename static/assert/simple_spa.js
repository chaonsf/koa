/************
 *  routes= {
 *   "key":{
 *        templateUrl:"" , 
 *        default_params:{},
 *        controller:[".js"],
 *        css:[""],
 *        destory:fn,
 *        before:fn,
 *        after:fn
 *    }
 * }
 * 
 * 
 * 
 ***********/

(function($){
    var util= {
        trim: function(str,reg){
            if(!str) return str;
            if(reg instanceof RegExp)
            {
               str= str.replace(reg,"");
            }
            else 
            {
               var _r= new RegExp("^"+ reg);
               str= str.replace(_r,"");  
            }
            return str;
      },
      //路由识别
      readerRoute:function(hash,routes){
              for(var pattern in routes){
                 var route= routes[pattern];  
                 var map= pattern;
                 var reg_m= /\/:([\w_]+)/gi;
                 var parr= map.match(reg_m);
                 var reg_normal_str= map.replace(reg_m,"(/?\\w*)");
                 var reg_normal = new RegExp(reg_normal_str,"i");
  
                 if(reg_normal.test(hash))
                 {
                    var ret= reg_normal.exec(hash);
                    if(ret == null) return;
  
                    if(ret.length>0)
                    {
                        ret = ret.slice(1);
                    }
                    var obj=null;
                    for(var i=0;i< ret.length;i++)
                    {
                        obj= obj || {};
                        var key= util.trim(parr[i],/^\/./i);
                        var _val= util.trim(ret[i],/^\//i)
                        obj[key]= _val;
  
                    }
                    var default_params= route.default_params;
                    if(default_params)
                    {
                        for(var _dk in default_params)
                        {
                            obj= obj||{};
                            if(!obj[_dk])
                            {
                                obj[_dk]= default_params[_dk];
                            }
  
                        }
                    }
                    route.pattern= pattern;
                    route.params= obj;
                    return route;
                 }
             }
             return null;
      
      } ,
      getHash:function(){
         return location.hash.replace(/^\#/,"");

      }
    }  
    
    /****
     *  spspa
     *  let spa= new spspa({
     *     "/index":{
            templateUrl:"index.html",
            controller:["fuzhu.js","index.js"],
            css:"index.css",
            default_params:{
                save:"jojo"
            }

        },  
            before:function(){
                console.log("redirect index");   
            },
            after:function(params){
                console.log(params);
            }
        },
        "/lunch/:id":{
            templateUrl:"lunch.html",

            after:function(params){
                    console.log(params);
            }    
        },
        "/:id/:count":{
            templateUrl:function(params,cb){
                var _html= JSON.stringify(params);
                cb(_html); 
            }
        }
     * })
     * 配置属性
     * router: 路由配置项(与vipspa一致),
     * view: 渲染路径(目前仅支持dom类型，参考vipspa),
     * hashchange： 当路径发生变化时触发事件，
     *              参数格式{
     *                  from: 表示前路径,
     *                  to: 表示当前路径
     *              }
     */
    var spspa= function(cfg){
        var self= this;
        self.routers= [];
        self.render_view= null;
        self.cache={};
        self.current;
        self.hashchange=null;
        self.messageStack = {};
        this._private={
             ///读取html，并缓存，执行回调
                activeRouterTemplate:function(router,is_force,cb)
                {
                    var pattern= router.pattern;
                    var tpl_url = router.templateUrl;
                    if(typeof tpl_url=="function")
                    {
                        tpl_url(router.params,cb);
                        return;
                    }
                    
                    if(self.cache[pattern] && !is_force)
                    {
                        var html=self.getCacheHtml(pattern);
                        self.debug && console.log("use cache:"+ pattern);
                        cb(html);
                    }
                    else
                    {
                        if($)
                        {
                            $.get(tpl_url,function(html,status){
                                if(status=="success")
                                {
                                    self.saveCache(pattern,html);
                                    cb(html);    
                                }
                                else{
                                    console.warn(pattern + "无法读取模板信息"); 

                                }

                            },"html");
                        }
                        else{
                            console.warn("无法使用jquery，无法读取模板信息");
                        }     

                    }
                },
                existsCss:function(css){
                   if(document.querySelector)
                   {
                      return  document.querySelectorAll("link[href='"+ css +"']").length;

                   }
                   return false;

                },
                loadScript:function(controller,cb){
                        
                        if(typeof controller=="string")
                        {
                            controller= [controller];
                        }
                        for(var i=0;i< controller.length;i++){
                            var src= controller[i];
                            var script ,
                            loaded;
                            if(/.js$/.test(src)){
                                script = document.createElement('script'); 
                                script.setAttribute('src', src);
                                script.setAttribute('defer', true);
                            }
                            else{
                                if(!self._private.existsCss(src)){
                                    script = document.createElement('link') ;
                                    script.setAttribute('href', src);
                                    script.setAttribute('rel', "stylesheet");
                                    script.setAttribute('type', "text/css");
                                }
                                else
                                {
                                    continue;
                                }
                            }
                            
                            var current_index= i,last_length= controller.length;
                            script.onreadystatechange = script.onload = function() {
                                this.onreadystatechange = null;

                                if(/.js$/.test(src)){
                                    document.documentElement.removeChild(this);
                                }
                                if (!loaded && current_index == last_length -1) {
                                    if(typeof cb==='function')
                                        setTimeout(function(){cb(self.current.params)},100);
                                }
                                loaded = true;
                            };
                        document.documentElement.appendChild(script);
                    }
                }

        }
    }

    spspa.prototype= {
         init: function(cfg){
           
            var self= this;
            self.config= cfg;
            self.routers= cfg.router || {};
            self.render_view= cfg.view || null;
            self.hashchange= cfg.hashchange;
            self.debug= cfg.debug;
            self.refresh(true);

            //路由切换
            window.addEventListener('hashchange',function(){
                self.refresh();
            })
            
            
         },
         refresh:function(is_force){

           var self= this;
           var _package= {
                from: self.current? self.current.pattern : ""
            }
            
            if(self.current && typeof self.current.destory=="function"){
                self.current.destory(self.current); 
            }

           var hash_str= util.getHash() ;
           var _cur=  util.readerRoute(hash_str,self.routers);
           if(_cur == null)
           {
                console.warn(hash_str + "路由捕获错误");  
                return;
           }
           
           if(self.messageStack["_flask_message"])
           {
               _cur.params= _cur.params ||{};
               _cur.params["flask_message"]= self.messageStack["_flask_message"];
               delete self.messageStack["_flask_message"]
           }
           self.current= _cur;

           _package.to= _cur.pattern;

           var _callback= function(html){
                self.render_view.innerHTML= html;
                var css= _cur.css; 
                if(css && css.length>0){
                    self._private.loadScript(css);
                }
            
                var controller= _cur.controller; 
                if( controller && controller.length>0){
                    self._private.loadScript(controller,_cur.after);
                }
                else{
                   if(_cur.after && typeof _cur.after=="function")
                   {
                      _cur.after(_cur.params);
                   }

                }
           }
           if(_cur.before && typeof _cur.before=="function")
           {
              _cur.before(_cur.params);
           }
           if(typeof self.hashchange=="function"){
                self.hashchange(_package);
           }
           self._private.activeRouterTemplate(_cur,is_force,_callback);
         },
         ///获取路由信息
         getRouterParams:function(){
            return  this.current ? this.current.params : null; 
         },
         getFlaskMessage:function(){
            
            if(!this.current.params){ 
                return null;
            }
            return this.current.params["flask_message"] ;
         },
         getMessage:function(uid){
            return this.messageStack[uid] ;  

         },
         setMessage:function(uid,obj){
            this.messageStack[uid]= obj;
         },
         clearMessage:function(){
            this.messageStack=[];
         },
         go:function(path,flask_message)
         {
            this.messageStack["_flask_message"]= flask_message;
            if(!path || path.length==0)
            {
                this.refresh();    
            } 
            else{
                location.hash= (/^#/.test(path) ?  path : "#"+path);
            }
         },
         saveCache:function(params,html){
              var key= params;
              if(typeof key!="string")
              {
                 key= JSON.stringify(params);
              }
              this.cache[key]= html;    
         },
         getCacheHtml:function(params)
         {
            var key= params;
            if(typeof key!="string")
            {
               key= JSON.stringify(params);
            }
            return this.cache[key];    
         },
         removeCss:function(css_arr){
            if(!document.querySelector)
            {
               return; 
            }
             if(typeof css_arr=="string")
             {
                css_arr= [css_arr];
             }
             for(var i=0;i< css_arr.length;i++)
             {
                var css= css_arr[i];
                var scripts= document.querySelectorAll("link[href='"+ css +"']");
                for(var j=0;j< scripts.length ;j++)
                {
                    var script= scripts[j];
                    document.documentElement.removeChild(script);
                }
             }

         }

    }
    spspa.prototype.start= spspa.prototype.init;

    window.spspa= spspa;


})($);