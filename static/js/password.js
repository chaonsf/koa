!function(t){var e={};function n(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=60)}({0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"commumal",function(){return p});var a=n(1),i=(n.n(a),n(2)),o=(n.n(i),n(3)),l=(n.n(o),n(4)),s=(n.n(l),n(5)),r=(n.n(s),n(6)),d=n(7),c=n(8),u=n(9),m=n(10);n.d(e,"descroll",function(){return r.a}),n.d(e,"Applyer",function(){return d.a}),n.d(e,"listWindow",function(){return c.a}),n.d(e,"addition",function(){return u.a}),n.d(e,"versionUpdate",function(){return m.a});var f=null,p={dateToday(t){let e=moment().format("YYYY-MM-DD"),n="";return n=moment(t).format("YYYY-MM-DD")==e?"今天":moment(t).add(1,"d").format("YYYY-MM-DD")==e?"昨天":moment(t).add(2,"d").format("YYYY-MM-DD")==e?"前天":moment(t).add(3,"d").format("YYYY-MM-DD")==e?"大前天":t},timePicker(t){f=weui.datePicker({start:2017,end:2050,defaultValue:t.default,onConfirm:function(e){$("."+t.className).find(".weui-picker").on("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd",function(){p.HourMin(t.finger,e,t.hours,t.className)})},id:t.className,className:t.className})},HourMin(t,e,n,a){e[1]=e[1]-1;var i=moment(e).format("YYYY-MM-DD");if(!p.hours.length)for(var o=0;o<24;o++){var l={};l.label=1===(""+o).length?"0"+o:""+o,l.value=o,p.hours.push(l)}if(!p.minites.length)for(var s=0;s<60;s++){var r={};r.label=1===(""+s).length?"0"+s:""+s,r.value=s,p.minites.push(r)}f=weui.picker(p.hours,p.symbol,p.minites,{defaultValue:n,onConfirm:function(e){var n=e[0].label+":"+e[2].label,a=i+" "+n;$(t).val(a)},id:"f"+a})},hours:[],minites:[],symbol:[{label:":",value:0}],isEmptyObj(t){for(let e in t)return!1;return!0},caching(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"EHUSER";return localStorage.getItem(t)},uploader:0,picture(t){weui.uploader(t.ids,{url:"../file/Upload",auto:!1,onQueued:t.queued,onBeforeSend:t.beforeSend,onBeforeQueued(t){return["image/jpg","image/jpeg","image/png","image/gif"].indexOf(this.type)<0?(weui.alert("请上传图片"),!1):this.size>8388608?(weui.alert("请上传不超过8M的图片"),!1):t.length>8?(weui.alert("最多只能上传8张图片，请重新选择"),!1):p.uploader+1>8?(weui.alert("最多只能上传8张图片"),!1):void++p.uploader},onProgress(t){},onSuccess:t.success,onError(t){}})},onShowImg(t){for(var e=$(t.target);!e.hasClass("weui-uploader__file")&&e;)e=e.parent();if(e.length){var n=e.attr("style")||"";e.data("id");n&&(n=n.match(/url\((.*?)\)/)[1].replace(/"/g,""));var a=weui.gallery(n,{onDelete:function(){weui.confirm("确定删除该图片？",function(){e.remove(),--p.uploader,a.hide()})}})}},urlencode:t=>(t=(t+"").toString(),encodeURIComponent(t).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")),back(){history.go(-1)},confirm(t){f=weui.confirm("",{title:t.title||"是否确定提交?",buttons:[{label:"取消",type:"default"},{label:"确定",type:"primary",onClick:t.click}]})},datePicker(t){let e=moment().format("YYYY-MM-DD").split("-"),n=t.dateTime,a=(new Date).getFullYear();f=weui.datePicker({start:a,end:2032,defaultValue:""==n?[e[0],e[1],e[2]]:[n[0],n[1],n[2]],onConfirm:e=>{t.confirm(e)},id:t.id})},reimbursePicker(t){f=weui.picker(t.data,{depth:1,defaultValue:t.default,onConfirm(e){t.confirm(e)},id:t.id})},isThrough(){$("#switchCP").prop("checked")?$("label.result").text("审核通过"):$("label.result").text("审核不通过")},notice(){$.defs.myPost({m:"SELECT",SP_NAME:"SP_DPPS_ALARM_SHOW"}).then(t=>{$(".lingdang").html(t[0].WCOUNT),0==t[0].WCOUNT?$(".lingdang").hide():(localStorage.getItem("status")||p.noticeList(),localStorage.setItem("status","notRefresh"))})},noticeList(){$.defs.loadingshow(),$.defs.myPost({m:"SELECT",SP_NAME:"SP_DPPS_ALARM_SHOW",TYPE:"list"}).then(t=>{$.defs.loadinghide();let e=p.noticeListHtml(t);f=weui.dialog({title:"消息",content:e.html(),className:"custom-classn",buttons:[{label:"关闭",type:"primary"}]}),$(f).find(".weui-dialog__bd").addClass("padding0"),$(f).find(".weui-cell").on("click",function(){var t=$(this).closest(".weui-cell").attr("index");window.location.href="../index/audited",localStorage.setItem("audited",t),f.hide()})})},noticeListHtml(t){let e="";t.forEach(t=>{t.OA_LINK&&(e+=`\n                   <div class="weui-cell weui-cell_access borTine f12" index="${t.OA_TYPE}">\n                    <div class="weui-cell__bd">\n                       <span>${t.OA_TYPE_DESC}</span>\n                       <span class="ml10 weui-badge">${t.WCOUNT}</span>\n                    </div>\n                     <div class="weui-cell__ft"></div>\n                   </div>\n                  `)});let n=$('<div  class="tips dn">\n                       <div class="weui-cells"></div>\n                    </div>');return n.find(".weui-cells").append(e),n},versionAndNotice(){var t=localStorage.getItem("version")?localStorage.getItem("version"):0;m.a.config.versionNumber>t?(localStorage.setItem("version",m.a.config.versionNumber),m.a.events.version(p.notice)):p.notice()},loadDate:function(){var t=$(".seledate").find("span"),e=new Date,n=e.getDate(),a=e.getMonth(),i=e.getFullYear();11==a&&(a=-1,i+=1),$.each(t,function(t,e){var o=$(e).attr("data-index");1==o?($(e).attr("data-start",moment().subtract(n-1,"d").format("YYYY-MM-DD")),$(e).attr("data-end",moment([i,a+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):2==o?($(e).attr("data-start",moment().subtract(n-1,"d").subtract(1,"M").format("YYYY-MM-DD")),$(e).attr("data-end",moment().subtract(n,"d").format("YYYY-MM-DD"))):3==o&&($(e).attr("data-start",moment().subtract(n-1,"d").subtract(2,"M").format("YYYY-MM-DD")),$(e).attr("data-end",moment([i,a+1,1]).subtract(1,"d").format("YYYY-MM-DD")))}),p.timeFrame()},spanSelect:function(){$(this).addClass("seleted").siblings().removeClass("seleted"),p.timeFrame()},timeFrame:function(){var t=$(".seleted").attr("data-start"),e=$(".seleted").attr("data-end");$(".shijian span").html(t+"至"+e)}};$(function(){window.addEventListener("resize",function(){"INPUT"!==document.activeElement.tagName&&"TEXTAREA"!==document.activeElement.tagName||document.activeElement.scrollIntoView({behavior:"smooth"})}),window.addEventListener("pageshow",function(t){t.persisted&&location.href==location.protocol+"//"+location.host+"/oa/index/index"&&(localStorage.removeItem("DATE"),localStorage.removeItem("audited"),localStorage.removeItem("MoreDate"),localStorage.removeItem("auditMore"))}),$("h2.back").off("click").on("click",p.back),window.onhashchange=function(t){$.hidebox(),f&&f.hide()},$(".lingdang").off("click").on("click",()=>{p.noticeList()}),$(".icon-icon--").off("click").on("click",()=>{p.noticeList()});let t=location.protocol+"//"+location.host+"/oa/login/index";document.referrer!=t&&p.notice(),$("input").on("blur",()=>{setTimeout(function(){window.scrollTo(0,0)},100)})})},1:function(t,e){},10:function(t,e,n){"use strict";var a={events:{str:t=>{return`\n            <div class="weui-article">\n            <h1>版本更新介绍</h1>\n            <div class="boxa">\n            <section>\n               <h3 class="blue">当前版本：v${t}<a class="ml10 shouce">下载操作手册</a></h3>\n                <h4>一、新增待审核模块</h4>\n                <p>1、将之前的报销管理、外勤管理、员工请假以及加班申请模块里的待审核部分整合出来作为一个单独的模块。</p>\n                <h4>二、优化页面布局</h4>\n                <p>1、在可视区域宽度大于768px的设备中，网页都以375px的宽度居中显示</p>\n                <p>2、之前版本各个模板都在一个单页面中，当前版本将每个模块独立为一个单页面</p>\n                <p>3、更换了模块内按条件搜索的布局</p>\n                <h4>三.页面图标的更换</h4>\n            </section>\n  \n            </div>\n           </div>\n            `},version:t=>{let e=a.events.str(a.config.versionNumber);$.showbox({content:e,cls:"tyi",buttons:[{text:"关闭",click:function(){"function"==typeof t&&t(),$.hidebox()}}],beforeShow:function(){$(".popup_content").addClass("ver"),$(".tyi").find("a.shouce").on("click",function(){location="../static/document/OA_Manual.pdf"})}})}},config:{versionNumber:3.1}};e.a=a},2:function(t,e){},3:function(t,e){},4:function(t,e){},5:function(t,e){},6:function(t,e,n){"use strict";var a={events:{onscroll:function(t,e){t.scrollHeight-t.offsetHeight-t.scrollTop<100&&(a.config.page.index<=a.config.total?a.config.isLoad&&(a.config.isLoad=!1,e.datafresh()):a.config.page.index>a.config.total&&a.config.isLoad&&$(".page__ft:last").removeClass("dn")),t.scrollHeight-t.offsetHeight-t.scrollTop>100&&$(".page__ft").addClass("dn")}},config:{page:{index:1,rows:10},isLoad:!0,total:1,pages:function(t){a.config.total=Math.ceil(parseFloat(t.total/a.config.page.rows))}}};e.a=a},60:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),i={methods:{init(){$(".submit").on("click",i.events.submit),$(".btnBack").on("click",a.commumal.back)}},events:{submit(){let t=$.defs.submit({container:".addReport"});t.NEW_PASSWORD&&t.PASSWORD&&t.new2?t.new2!=t.NEW_PASSWORD?$.defs.msg("俩次密码输入不一致"):(t.m="UPDATE",t.SP_NAME="SP_USER_CHANGE_PASSWORD",a.commumal.confirm({click:()=>{$.defs.loadingshow(),$.defs.myPost(t).then(t=>{$.defs.loadinghide(),0==t.RETURN_CODE?(weui.toast("操作成功",2e3),setTimeout(function(){history.go(-1)},3e3)):$.defs.msg(t.RETURN_MESSAGE)})}})):$.defs.msg("请输入完整")}},config:{init(){}}};$(function(){i.config.init(),i.methods.init()})},7:function(t,e,n){"use strict";var a={content:()=>$('\n           <div class="weui-cell">\n             <div class="weui-cell__bd">\n                <input class="weui-input"  placeholder="请输入工号或姓名"/>\n             </div>\n             <div class="weui-cell__ft">\n                <span class="weui-vcode-btn query">查询</span>\n              </div>\n          </div>\n          <div class="member" style="padding:10px">\n            \n          </div>\n           '),employee(t){let e=this,n=a.content();$.showbox({content:n,cls:"staff",buttons:[{text:"关闭",click(){$.hidebox()}}],beforeShow(){e.query(t)}})},query(t){var e=$(".staff").find(".weui-input").val();$.defs.loadingshow(),$.defs.myPost({m:"LIST",SP_NAME:"SP_DPPS_APPLY_LIST",MEME_QUERY:e}).then(e=>{$.defs.loadinghide(),$(".staff").find(".query").on("click",()=>{a.query(t)});let n=e.rows,i=a.staffList(n),o=$(i);$(".staff").find(".member").html(o),$(".staff").find(".membersName").on("click",function(){let e=this;"function"==typeof t.span&&t.span(e)})})},staffList(t){let e="";for(let n=0;n<t.length;n++)e+=`\n              <span class="membersName" apps="${t[n].DPPS_KY}">${t[n].MEME_NAME}(${t[n].DPDP_NAME})</span>\n             `;return e}};e.a=a},8:function(t,e,n){"use strict";var a=n(0),i={content:()=>"\n          <div class='drawer'>\n            <input type='text' class='input' placeholder=\"姓名、单号\">\n          <p class='headline'>日期:</p>\n            <ul class='date'>\n              <li class='seleted' data-index='0'>今天</li>\n              <li data-index='1'>一周</li>\n              <li data-index=\"2\">三周</li>\n              <li data-index=\"3\">当月</li>\n              <li data-index=\"4\">三月</li>\n              <li data-index=\"5\">半年</li>\n              <li data-index=\"6\">一年</li>\n           </ul>\n        </div>\n          ",query(t){let e=i.content(),n=$(e);$.showbox({content:n,cls:"select",buttons:[{text:"查询",click:function(){let e=i.getData();"function"==typeof t.loadCondition&&t.loadCondition(e),"function"==typeof t.fresh&&t.fresh(e),localStorage.setItem(t.cache,JSON.stringify(e)),$.hidebox()}}],beforeShow:function(){i.fillTime();let e=JSON.parse(a.commumal.caching(t.cache));e&&i.handleCondition(e),$(".select").find(".date li").on("click",i.liClick)}})},fillTime(){var t=$(".select").find(".date li"),e=new Date,n=e.getMonth(),a=e.getFullYear(),i=e.getDate(),o=e.getDay();11==n&&(n=-1,a+=1),$.each(t,(t,e)=>{let l=$(e).attr("data-index");0==l?($(e).attr("data-start",moment().format("YYYY-MM-DD")),$(e).attr("data-end",moment().format("YYYY-MM-DD"))):1==l?0!=o?($(e).attr("data-start",moment().subtract(o-1,"d").format("YYYY-MM-DD")),$(e).attr("data-end",moment().subtract(o-7,"d").format("YYYY-MM-DD"))):($(e).attr("data-start",moment().subtract(6,"d").format("YYYY-MM-DD")),$(e).attr("data-end",moment().format("YYYY-MM-DD"))):2==l?0!=o?($(e).attr("data-start",moment().subtract(13+o,"d").format("YYYY-MM-DD")),$(e).attr("data-end",moment().subtract(o-7,"d").format("YYYY-MM-DD"))):($(e).attr("data-start",moment().subtract(21,"d").format("YYYY-MM-DD")),$(e).attr("data-end",moment().format("YYYY-MM-DD"))):3==l?($(e).attr("data-start",moment().subtract(i-1,"d").format("YYYY-MM-DD")),$(e).attr("data-end",moment([a,n+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):4==l?($(e).attr("data-start",moment().subtract(i-1,"d").subtract(2,"M").format("YYYY-MM-DD")),$(e).attr("data-end",moment([a,n+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):5==l?($(e).attr("data-start",moment().subtract(i-1,"d").subtract(5,"M").format("YYYY-MM-DD")),$(e).attr("data-end",moment([a,n+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):6==l&&($(e).attr("data-start",moment().subtract(i-1,"d").subtract(11,"M").format("YYYY-MM-DD")),$(e).attr("data-end",moment([a,n+1,1]).subtract(1,"d").format("YYYY-MM-DD")))})},handleCondition(t){for(let e=0;e<t.length;e++){let n=t[e];0==n.value.index?$(".select .input").val(n.name):$(".select .date li[data-start="+n.value.value.start+"][data-end="+n.value.value.end+"]").addClass("seleted").siblings().removeClass("seleted")}},liClick(){$(this).addClass("seleted").siblings().removeClass("seleted")},getData(){let t,e=$(".select").find(".input").val(),n=$(".select").find(".date .seleted");return t=e?[{name:e,value:{index:0,value:e}},{name:n.text(),value:{index:1,value:{start:n.attr("data-start"),end:n.attr("data-end")}}}]:[{name:n.text(),value:{index:1,value:{start:n.attr("data-start"),end:n.attr("data-end")}}}]},defaultDelete(){$(this).closest("li").remove()},backToStartPoint(){$(".content").scrollTop(0),$(".getMore").addClass("dn")}};e.a=i},9:function(t,e,n){"use strict";var a={list:null,content:()=>$('\n           <div class="weui-cell">\n              <div class="weui-cell__bd">\n               <input class="weui-input"  placeholder="请输入工号或姓名"/>\n             </div>\n              <div class="weui-cell__ft">\n                <span class="weui-vcode-btn query">查询</span>\n              </div>\n            </div>\n            <div class="weui-cells receip f12">\n\n            </div>\n           '),bills(t){let e=a.content();$.showbox({content:e,cls:"Additionreceipts",buttons:[{text:"关闭",click(){$.hidebox()}}],beforeShow(){a.query(t)}})},query(t){$.defs.loadingshow(),$.defs.myPost({SP_NAME:"SP_ATDC_ATTENDANCE_INFO_FEPP_LIST",m:"SELECT",QUERY:$(".Additionreceipts").find(".weui-input").val(),APPLY_EHUSER:$(".applyUser").attr("data-value"),DATE:$(".SelectedDate").find("span").text()}).then(e=>{$.defs.loadinghide(),a.list=e,$(".Additionreceipts").find(".query").on("click",()=>{a.query(t)});let n=a.billList(e),i=$(n);$(".Additionreceipts").find(".receip").html(i),$(".Additionreceipts").find(".add_rep").on("click",function(){let e=this;"function"==typeof t.span&&t.span(e)})})},billList(t){let e="";for(let n=0;n<t.length;n++)e+=`\n                <div class="weui-cell add_rep" ATDC_KY="${t[n].ATDC_KY}" style="border-bottom: 1px solid #ccc">\n                 <div class="weui-cell__bd">\n                    <p class="number"><span class="cardNumber">${t[n].ATDC_ID}</span><span class="fr cardType">${t[n].SYSV_ATDC_DESC}</span></p>\n                    <p>${t[n].ATDC_START_DT}起${t[n].ATDC_DAY}天${t[n].ATDC_HUMAN_CNT}人</p>\n                    <p>地区范围:${t[n].BSTR_NAME}</p>\n                    <p>详细地址:${t[n].ATDC_SITE}</p>\n                 </div>\n                </div>\n               `;return e}};e.a=a}});
//# sourceMappingURL=password.js.map