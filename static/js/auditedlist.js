!function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=45)}({0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"commumal",function(){return f});var n=a(1),i=(a.n(n),a(2)),s=(a.n(i),a(3)),l=(a.n(s),a(4)),r=(a.n(l),a(5)),o=(a.n(r),a(6)),d=a(7),c=a(8),u=a(9),m=a(10);a.d(t,"descroll",function(){return o.a}),a.d(t,"Applyer",function(){return d.a}),a.d(t,"listWindow",function(){return c.a}),a.d(t,"addition",function(){return u.a}),a.d(t,"versionUpdate",function(){return m.a});var _=null,f={dateToday(e){let t=moment().format("YYYY-MM-DD"),a="";return a=moment(e).format("YYYY-MM-DD")==t?"今天":moment(e).add(1,"d").format("YYYY-MM-DD")==t?"昨天":moment(e).add(2,"d").format("YYYY-MM-DD")==t?"前天":moment(e).add(3,"d").format("YYYY-MM-DD")==t?"大前天":e},timePicker(e){_=weui.datePicker({start:2017,end:2050,defaultValue:e.default,onConfirm:function(t){$("."+e.className).find(".weui-picker").on("animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd",function(){f.HourMin(e.finger,t,e.hours,e.className)})},id:e.className,className:e.className})},HourMin(e,t,a,n){t[1]=t[1]-1;var i=moment(t).format("YYYY-MM-DD");if(!f.hours.length)for(var s=0;s<24;s++){var l={};l.label=1===(""+s).length?"0"+s:""+s,l.value=s,f.hours.push(l)}if(!f.minites.length)for(var r=0;r<60;r++){var o={};o.label=1===(""+r).length?"0"+r:""+r,o.value=r,f.minites.push(o)}_=weui.picker(f.hours,f.symbol,f.minites,{defaultValue:a,onConfirm:function(t){var a=t[0].label+":"+t[2].label,n=i+" "+a;$(e).val(n)},id:"f"+n})},hours:[],minites:[],symbol:[{label:":",value:0}],isEmptyObj(e){for(let t in e)return!1;return!0},caching(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"EHUSER";return localStorage.getItem(e)},uploader:0,picture(e){weui.uploader(e.ids,{url:"../file/Upload",auto:!1,onQueued:e.queued,onBeforeSend:e.beforeSend,onBeforeQueued(e){return["image/jpg","image/jpeg","image/png","image/gif"].indexOf(this.type)<0?(weui.alert("请上传图片"),!1):this.size>8388608?(weui.alert("请上传不超过8M的图片"),!1):e.length>8?(weui.alert("最多只能上传8张图片，请重新选择"),!1):f.uploader+1>8?(weui.alert("最多只能上传8张图片"),!1):void++f.uploader},onProgress(e){},onSuccess:e.success,onError(e){}})},onShowImg(e){for(var t=$(e.target);!t.hasClass("weui-uploader__file")&&t;)t=t.parent();if(t.length){var a=t.attr("style")||"";t.data("id");a&&(a=a.match(/url\((.*?)\)/)[1].replace(/"/g,""));var n=weui.gallery(a,{onDelete:function(){weui.confirm("确定删除该图片？",function(){t.remove(),--f.uploader,n.hide()})}})}},urlencode:e=>(e=(e+"").toString(),encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")),back(){history.go(-1)},confirm(e){_=weui.confirm("",{title:e.title||"是否确定提交?",buttons:[{label:"取消",type:"default"},{label:"确定",type:"primary",onClick:e.click}]})},datePicker(e){let t=moment().format("YYYY-MM-DD").split("-"),a=e.dateTime,n=(new Date).getFullYear();_=weui.datePicker({start:n,end:2032,defaultValue:""==a?[t[0],t[1],t[2]]:[a[0],a[1],a[2]],onConfirm:t=>{e.confirm(t)},id:e.id})},reimbursePicker(e){_=weui.picker(e.data,{depth:1,defaultValue:e.default,onConfirm(t){e.confirm(t)},id:e.id})},isThrough(){$("#switchCP").prop("checked")?$("label.result").text("审核通过"):$("label.result").text("审核不通过")},notice(){$.defs.myPost({m:"SELECT",SP_NAME:"SP_DPPS_ALARM_SHOW"}).then(e=>{$(".lingdang").html(e[0].WCOUNT),0==e[0].WCOUNT?$(".lingdang").hide():(localStorage.getItem("status")||f.noticeList(),localStorage.setItem("status","notRefresh"))})},noticeList(){$.defs.loadingshow(),$.defs.myPost({m:"SELECT",SP_NAME:"SP_DPPS_ALARM_SHOW",TYPE:"list"}).then(e=>{$.defs.loadinghide();let t=f.noticeListHtml(e);_=weui.dialog({title:"消息",content:t.html(),className:"custom-classn",buttons:[{label:"关闭",type:"primary"}]}),$(_).find(".weui-dialog__bd").addClass("padding0"),$(_).find(".weui-cell").on("click",function(){var e=$(this).closest(".weui-cell").attr("index");window.location.href="../index/audited",localStorage.setItem("audited",e),_.hide()})})},noticeListHtml(e){let t="";e.forEach(e=>{e.OA_LINK&&(t+=`\n                   <div class="weui-cell weui-cell_access borTine f12" index="${e.OA_TYPE}">\n                    <div class="weui-cell__bd">\n                       <span>${e.OA_TYPE_DESC}</span>\n                       <span class="ml10 weui-badge">${e.WCOUNT}</span>\n                    </div>\n                     <div class="weui-cell__ft"></div>\n                   </div>\n                  `)});let a=$('<div  class="tips dn">\n                       <div class="weui-cells"></div>\n                    </div>');return a.find(".weui-cells").append(t),a},versionAndNotice(){var e=localStorage.getItem("version")?localStorage.getItem("version"):0;m.a.config.versionNumber>e?(localStorage.setItem("version",m.a.config.versionNumber),m.a.events.version(f.notice)):f.notice()},loadDate:function(){var e=$(".seledate").find("span"),t=new Date,a=t.getDate(),n=t.getMonth(),i=t.getFullYear();11==n&&(n=-1,i+=1),$.each(e,function(e,t){var s=$(t).attr("data-index");1==s?($(t).attr("data-start",moment().subtract(a-1,"d").format("YYYY-MM-DD")),$(t).attr("data-end",moment([i,n+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):2==s?($(t).attr("data-start",moment().subtract(a-1,"d").subtract(1,"M").format("YYYY-MM-DD")),$(t).attr("data-end",moment().subtract(a,"d").format("YYYY-MM-DD"))):3==s&&($(t).attr("data-start",moment().subtract(a-1,"d").subtract(2,"M").format("YYYY-MM-DD")),$(t).attr("data-end",moment([i,n+1,1]).subtract(1,"d").format("YYYY-MM-DD")))}),f.timeFrame()},spanSelect:function(){$(this).addClass("seleted").siblings().removeClass("seleted"),f.timeFrame()},timeFrame:function(){var e=$(".seleted").attr("data-start"),t=$(".seleted").attr("data-end");$(".shijian span").html(e+"至"+t)}};$(function(){window.addEventListener("resize",function(){"INPUT"!==document.activeElement.tagName&&"TEXTAREA"!==document.activeElement.tagName||document.activeElement.scrollIntoView({behavior:"smooth"})}),window.addEventListener("pageshow",function(e){e.persisted&&location.href==location.protocol+"//"+location.host+"/oa/index/index"&&(localStorage.removeItem("DATE"),localStorage.removeItem("audited"),localStorage.removeItem("MoreDate"),localStorage.removeItem("auditMore"))}),$("h2.back").off("click").on("click",f.back),window.onhashchange=function(e){$.hidebox(),_&&_.hide()},$(".lingdang").off("click").on("click",()=>{f.noticeList()}),$(".icon-icon--").off("click").on("click",()=>{f.noticeList()});let e=location.protocol+"//"+location.host+"/oa/login/index";document.referrer!=e&&f.notice(),$("input").on("blur",()=>{setTimeout(function(){window.scrollTo(0,0)},100)})})},1:function(e,t){},10:function(e,t,a){"use strict";var n={events:{str:e=>{return`\n            <div class="weui-article">\n            <h1>版本更新介绍</h1>\n            <div class="boxa">\n            <section>\n               <h3 class="blue">当前版本：v${e}<a class="ml10 shouce">下载操作手册</a></h3>\n                <h4>一、新增待审核模块</h4>\n                <p>1、将之前的报销管理、外勤管理、员工请假以及加班申请模块里的待审核部分整合出来作为一个单独的模块。</p>\n                <h4>二、优化页面布局</h4>\n                <p>1、在可视区域宽度大于768px的设备中，网页都以375px的宽度居中显示</p>\n                <p>2、之前版本各个模板都在一个单页面中，当前版本将每个模块独立为一个单页面</p>\n                <p>3、更换了模块内按条件搜索的布局</p>\n                <h4>三.页面图标的更换</h4>\n            </section>\n  \n            </div>\n           </div>\n            `},version:e=>{let t=n.events.str(n.config.versionNumber);$.showbox({content:t,cls:"tyi",buttons:[{text:"关闭",click:function(){"function"==typeof e&&e(),$.hidebox()}}],beforeShow:function(){$(".popup_content").addClass("ver"),$(".tyi").find("a.shouce").on("click",function(){location="../static/document/OA_Manual.pdf"})}})}},config:{versionNumber:3.1}};t.a=n},2:function(e,t){},3:function(e,t){},4:function(e,t){},45:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),i={methods:{init(){$(".btnBack").on("click",n.commumal.back),$(".queryMore").on("click",i.events.queryMore)}},events:{condition(e){let t="";for(let a=0;a<e.length;a++)t+=`\n                    <button data-value="${e[a].OA_TYPE}">${e[a].OA_TYPE_NAME}</button>\n                 `;let a=$(t);a.eq(0).addClass("select"),a.on("click",i.events.selectOption),$(".condition .buttons").html(a)},selectOption(){$(this).addClass("select").siblings().removeClass("select"),i.events.fresh()},fresh(){var e=$(".buttons .select").attr("data-value");let t=i.events.freshData(e);$.defs.myPost(t).then(t=>{let a=i.events.arrange(t.rows,e),n=i.events.content(a,e),s=$(n);s.find(".through").on("click",i.events.through),s.on("click",i.events.matterItem),$(".content").html(s)})},freshData(e){let t={m:"LIST",REVIEW_IND:"Y"};return"ATDC"==e?t.SP_NAME="SP_ATDC_ATTENDANCE_INFO_LIST":"RBRB"==e?t.SP_NAME="SP_RBRB_REIMBURSE_INFO_LIST":"LVLV"==e?t.SP_NAME="SP_LVLV_LEAVE_INFO_LIST":"OTBL"==e&&(t.SP_NAME="SP_OTBL_OVERTIME_BILL_INFO_LIST"),t},arrange:(e,t)=>("ATDC"==t?e.forEach(e=>{e.ApplyDate=n.commumal.dateToday(e.ATDC_APPLY_DT)}):"LVLV"==t?e.forEach(e=>{e.ApplyDate=n.commumal.dateToday(e.LVLV_ENTRY_DT),e.toDay=Math.ceil(e.LVLV_HOUR/4)/2}):"OTBL"==t&&e.forEach(e=>{e.ApplyDate=n.commumal.dateToday(e.OTBL_APPLY_DT)}),e),content(e,t){let a="";return e.forEach(e=>{"ATDC"==t?a+=`\n                     <div class="weui-form-preview item" index="${e.ATDC_KY}" sts="${e.ATDC_STS}" start="${e.ATDC_START_DT}" type="${e.SYSV_ATDC_TYPE}" name="${e.MEME_NAME}">\n                      <div class="weui-form-preview__hd">\n                        <div class="weui-form-preview__item">\n                          <label class="weui-form-preview__label black f12">${e.ATDC_ID}<span class="ml15rem">${e.SYSV_ATDC_TYPE_DESC}</span></label>\n                          <em class="weui-form-preview__value">${e.ATDC_STS_DESC}</em>\n                        </div>\n                      </div>\n                      <div class="weui-form-preview__bd">\n                        <div class="weui-form-preview__item">\n                           <label class="weui-form-preview__label black f12">${e.MEME_NAME}</label>\n                           <span class="weui-form-preview__value black f12">申请时间:${e.ApplyDate}</span>\n                        </div>\n                        <div class="weui-form-preview__item">\n                             ${i.events.businessOrReport(e)}\n                        </div>\n                        <div class="weui-form-preview__item">\n                          <label class="weui-form-preview__label black f12">\n                              地点:${e.ATDC_SITE}\n                          </label>\n                        </div>\n                      </div>\n                       <div class="weui-form-preview__ft">\n                            ${i.events.reportBtn(e)}\n                       </div>\n                     </div>\n                     `:"RBRB"==t?a+=`\n                     <div class="weui-form-preview item" DATE="${e.RBRB_APPLY_DT}" EHUSER="${e.DPPS_KY}" RBRB_STS="${e.RBRB_STS}" RBRB_KEY="${e.RBRB_KEY_STRING}" fepp="${e.FEPP_NAME}">\n                       <div class="weui-form-preview__hd">\n                         <label class="weui-form-preview__label black">${e.MEME_NAME}</label>\n                         <span class="weui-form-preview__value cost">￥<span class="RBRB_APPLY_AMT">${e.RBRB_APPLY_AMT}</span></span>\n                       </div>\n                       <div class="weui-form-preview__bd">\n                        <div class="weui-form-preview__item">\n                           <label class="weui-form-preview__label personName black">发生日期:${e.RBRB_APPLY_DT}</label>\n                           <span class="weui-form-preview__value black">${e.RBRB_STS_DESC}</span>\n                        </div>\n                       </div>\n                       <div class="weui-form-preview__ft">\n                            ${i.events.reimburseBtn(e)}\n                       </div>\n                     </div>\n                     `:"LVLV"==t?a+=`\n                     <div class="weui-form-preview item" index="${e.LVLV_KY}" lvlvId="${e.LVLV_ID}" type="${e.SYSV_LVLV_TYPE_DESC}">\n                       <div class="weui-form-preview__hd">\n                         <div class="weui-form-preview__item">\n                            <label class="weui-form-preview__label black f12">${e.LVLV_ID}</label>\n                            <em class="weui-form-preview__value">${e.LVLV_STS_DESC}</em>\n                        </div>\n                       </div>\n                       <div class="weui-form-preview__bd f12">\n                        <div class="weui-form-preview__item">\n                           <label class="weui-form-preview__label black">${e.MEME_NAME}</label>\n                           <span class="weui-form-preview__value black">休假时长:${e.LVLV_HOUR}小时(共${e.toDay}天)</span>\n                        </div>\n                       <div class="weui-form-preview__item">\n                           <label class="weui-form-preview__label black">休假时间</label>\n                           <span class="weui-form-preview__value black f12">${e.LVLV_FRM_DTM}至${e.LVLV_TO_DTM}</span>\n                       </div>\n                       <div class="weui-form-preview__item">\n                           <label class="weui-form-preview__label black">${e.SYSV_LVLV_TYPE_DESC}</label>\n                           <span class="weui-form-preview__value black f12">申请时间:${e.ApplyDate}</span>\n                       </div>\n                     </div>\n                     <div class="weui-form-preview__ft">${i.events.reportBtn(e)}</div>\n                     </div>\n                     `:"OTBL"==t&&(a+=`\n                     <div class="weui-form-preview item" index="${e.OTBL_KY}" lvlvId="${e.OTBL_ID}" type="${e.OTBL_STS_DESC}">\n                      <div class="weui-form-preview__hd">\n                        <div class="weui-form-preview__item">\n                          <label class="weui-form-preview__label black f12">${e.OTBL_ID}</label>\n                          <em class="weui-form-preview__value">${e.OTBL_STS_DESC}</em>\n                        </div>\n                      </div>\n                    <div class="weui-form-preview__bd f12">\n                      <div class="weui-form-preview__item">\n                          <label class="weui-form-preview__label black">${e.MEME_NAME}</label>\n                          <span class="weui-form-preview__value black">加班时长:${e.OTBL_HOUR}小时</span>\n                      </div>\n                      <div class="weui-form-preview__item">\n                          <label class="weui-form-preview__label black">加班时间</label>\n                          <span class="weui-form-preview__value black f12">${e.OTBL_START_DT}至${e.OTBL_END_DT}</span>\n                      </div>\n                      <div class="weui-form-preview__item">\n                          <label class="weui-form-preview__label black">申请时间</label>\n                          <span class="weui-form-preview__value black f12">${e.ApplyDate}</span>\n                      </div>\n                     </div>\n                     <div class="weui-form-preview__ft">${i.events.overTimeBtn(e)}</div>\n                     </div>\n                     `)}),a},businessOrReport(e){let t="";return"BSTP"==e.SYSV_ATDC_TYPE?t=` <label class="weui-form-preview__label black f12">发生日期:${e.ATDC_START_DT}起${e.ATDC_DAY}天<span class="ml15rem">${e.ATDC_HUMAN_CNT}人</span></label>`:"ETTN"==e.SYSV_ATDC_TYPE&&(t=`<label class="weui-form-preview__label black f12">发生日期:${e.ATDC_START_DT}<span class="ml15rem">${e.ATDC_HUMAN_CNT}人</span></label>`),t},reportBtn(e){let t="";return"Y"==e.REVIEW_IND&&"AUDIT"==e.AUDIT_BUTTON_FEATURE?t='<a class="weui-form-preview__btn weui-form-preview__btn_primary through" href="javascript:">通过</a>':"Y"==e.REVIEW_IND&&"AGREE"==e.AUDIT_BUTTON_FEATURE&&(t='<a class="weui-form-preview__btn weui-form-preview__btn_primary through" href="javascript:">已知晓</a>'),t},reimburseBtn(e){let t="";return"Y"==e.REVIEW_IND&&(t='<button type="submit" class="weui-form-preview__btn through" href="javascript:">通过</button>'),t},overTimeBtn(e){let t="";return"Y"==e.REVIEW_IND&&"AUDIT"==e.AUDIT_FEATURE?t='<a class="weui-form-preview__btn weui-form-preview__btn_primary through" href="javascript:">通过</a>':"Y"==e.REVIEW_IND&&"AGREE"==e.AUDIT_FEATURE&&(t='<a class="weui-form-preview__btn weui-form-preview__btn_primary through" href="javascript:">已知晓</a>'),t},through(e){e.stopPropagation(),e.preventDefault();var t=$(".buttons .select").attr("data-value"),a=$(this).closest(".weui-form-preview");if("ATDC"==t){let e=a.attr("index"),t=a.attr("name"),s=a.attr("start"),l=a.find("div.weui-form-preview__hd label span").text();n.commumal.confirm({title:"确定通过"+t+s+"的"+l+"申请?",click:()=>{i.events.reportThrough(e)}})}else if("RBRB"==t){let e=a.find(".weui-form-preview__hd .weui-form-preview__label").text()+"的"+a.find(".cost .RBRB_APPLY_AMT").text()+"元的费用申请？",t=a.attr("rbrb_key").split(",");n.commumal.confirm({title:"确定通过"+e,click:()=>{i.events.reimburseThrough(t)}})}else if("LVLV"==t){let e=a.attr("index"),t=a.attr("lvlvId"),s=a.attr("type");n.commumal.confirm({title:"确定通过单号为"+t+"的"+s+"申请？",click:()=>{i.events.askForLeaveThrough(e)}})}else if("OTBL"==t){let e=a.attr("index"),t=a.attr("lvlvid");n.commumal.confirm({title:"确定通过单号为"+t+"的加班申请？",click:()=>{i.events.overTimeThrough(e)}})}},reportThrough(e){$.defs.loadingshow(),$.defs.myPost({m:"UPDATE",SP_NAME:"SP_ATDC_ATTENDANCE_INFO_STATUS_UPDATE",REVIEW_IND:"Y",ATDC_KY:e}).then(e=>{$.defs.loadinghide(),0==e.RETURN_CODE?(weui.toast("操作成功",3e3),i.events.fresh()):$.defs.msg(e.RETURN_MESSAGE)})},reimburseThrough(e){$.defs.loadingshow();let t=[];$(e).each((e,a)=>{t.push({SP_NAME:"SP_RBRB_REIMBURSE_INFO_STATUS_UPDATE",m:"UPDATE",RBRB_KY:a,REVIEW_IND:"Y"})}),$.defs.myPost({m:"batch_update_transation",TB_NAME:"asfdf",SP_NAME:"dasds",DETAIL_STRING:JSON.stringify(t)}).then(e=>{$.defs.loadinghide(),0==e.RETURN_CODE?(weui.toast("操作成功",3e3),i.events.fresh()):$.defs.msg(e.RETURN_MESSAGE)})},askForLeaveThrough(e){$.defs.loadingshow(),$.defs.myPost({m:"UPDATE",SP_NAME:"SP_LVLV_LEAVE_INFO_STATUS_UPDATE",REVIEW_IND:"Y",LVLV_KY:e}).then(e=>{$.defs.loadinghide(),0==e.RETURN_CODE?(weui.toast("操作成功",3e3),i.events.fresh()):$.defs.msg(e.RETURN_MESSAGE)})},overTimeThrough(e){$.defs.loadingshow(),$.defs.myPost({m:"UPDATE",SP_NAME:"SP_OTBL_OVERTIME_BILL_INFO_STATUS_UPDATE",REVIEW_IND:"Y",OTBL_KY:e}).then(e=>{$.defs.loadinghide(),0==e.RETURN_CODE?(weui.toast("操作成功",3e3),i.events.fresh()):$.defs.msg(e.RETURN_MESSAGE)})},matterItem(){var e=$(".buttons .select").attr("data-value"),t=$(this).closest(".weui-form-preview");if(localStorage.setItem("audited",e),"ATDC"==e){let e=t.attr("index"),a=t.attr("sts");spspa.setMessage("auditing",{content:{atcdKy:e,atdcSts:a}}),spspa.go("/records")}else if("RBRB"==e)spspa.setMessage("auditing",{content:{DATE:t.attr("date"),RBRB_STS:t.attr("rbrb_sts"),APPLY_EHUSER:t.attr("ehuser")}}),spspa.go("/apply");else if("LVLV"==e){let e=t.attr("index");spspa.setMessage("auditing",{content:{lvlvKy:e}}),spspa.go("/leave")}else if("OTBL"==e){let e=t.attr("index");spspa.setMessage("auditing",{content:{otblKy:e}}),spspa.go("/work")}},queryMore(){spspa.go("/MoreList")}},config:{init(){let e=JSON.parse(n.commumal.caching("BASE_INFO"));$(".top .huan").text("待审核"),i.events.condition(e.oa_type);let t=n.commumal.caching("audited");t&&$(".buttons button[data-value="+t+"]").addClass("select").siblings().removeClass("select"),i.events.fresh()}}};$(function(){i.config.init(),i.methods.init()})},5:function(e,t){},6:function(e,t,a){"use strict";var n={events:{onscroll:function(e,t){e.scrollHeight-e.offsetHeight-e.scrollTop<100&&(n.config.page.index<=n.config.total?n.config.isLoad&&(n.config.isLoad=!1,t.datafresh()):n.config.page.index>n.config.total&&n.config.isLoad&&$(".page__ft:last").removeClass("dn")),e.scrollHeight-e.offsetHeight-e.scrollTop>100&&$(".page__ft").addClass("dn")}},config:{page:{index:1,rows:10},isLoad:!0,total:1,pages:function(e){n.config.total=Math.ceil(parseFloat(e.total/n.config.page.rows))}}};t.a=n},7:function(e,t,a){"use strict";var n={content:()=>$('\n           <div class="weui-cell">\n             <div class="weui-cell__bd">\n                <input class="weui-input"  placeholder="请输入工号或姓名"/>\n             </div>\n             <div class="weui-cell__ft">\n                <span class="weui-vcode-btn query">查询</span>\n              </div>\n          </div>\n          <div class="member" style="padding:10px">\n            \n          </div>\n           '),employee(e){let t=this,a=n.content();$.showbox({content:a,cls:"staff",buttons:[{text:"关闭",click(){$.hidebox()}}],beforeShow(){t.query(e)}})},query(e){var t=$(".staff").find(".weui-input").val();$.defs.loadingshow(),$.defs.myPost({m:"LIST",SP_NAME:"SP_DPPS_APPLY_LIST",MEME_QUERY:t}).then(t=>{$.defs.loadinghide(),$(".staff").find(".query").on("click",()=>{n.query(e)});let a=t.rows,i=n.staffList(a),s=$(i);$(".staff").find(".member").html(s),$(".staff").find(".membersName").on("click",function(){let t=this;"function"==typeof e.span&&e.span(t)})})},staffList(e){let t="";for(let a=0;a<e.length;a++)t+=`\n              <span class="membersName" apps="${e[a].DPPS_KY}">${e[a].MEME_NAME}(${e[a].DPDP_NAME})</span>\n             `;return t}};t.a=n},8:function(e,t,a){"use strict";var n=a(0),i={content:()=>"\n          <div class='drawer'>\n            <input type='text' class='input' placeholder=\"姓名、单号\">\n          <p class='headline'>日期:</p>\n            <ul class='date'>\n              <li class='seleted' data-index='0'>今天</li>\n              <li data-index='1'>一周</li>\n              <li data-index=\"2\">三周</li>\n              <li data-index=\"3\">当月</li>\n              <li data-index=\"4\">三月</li>\n              <li data-index=\"5\">半年</li>\n              <li data-index=\"6\">一年</li>\n           </ul>\n        </div>\n          ",query(e){let t=i.content(),a=$(t);$.showbox({content:a,cls:"select",buttons:[{text:"查询",click:function(){let t=i.getData();"function"==typeof e.loadCondition&&e.loadCondition(t),"function"==typeof e.fresh&&e.fresh(t),localStorage.setItem(e.cache,JSON.stringify(t)),$.hidebox()}}],beforeShow:function(){i.fillTime();let t=JSON.parse(n.commumal.caching(e.cache));t&&i.handleCondition(t),$(".select").find(".date li").on("click",i.liClick)}})},fillTime(){var e=$(".select").find(".date li"),t=new Date,a=t.getMonth(),n=t.getFullYear(),i=t.getDate(),s=t.getDay();11==a&&(a=-1,n+=1),$.each(e,(e,t)=>{let l=$(t).attr("data-index");0==l?($(t).attr("data-start",moment().format("YYYY-MM-DD")),$(t).attr("data-end",moment().format("YYYY-MM-DD"))):1==l?0!=s?($(t).attr("data-start",moment().subtract(s-1,"d").format("YYYY-MM-DD")),$(t).attr("data-end",moment().subtract(s-7,"d").format("YYYY-MM-DD"))):($(t).attr("data-start",moment().subtract(6,"d").format("YYYY-MM-DD")),$(t).attr("data-end",moment().format("YYYY-MM-DD"))):2==l?0!=s?($(t).attr("data-start",moment().subtract(13+s,"d").format("YYYY-MM-DD")),$(t).attr("data-end",moment().subtract(s-7,"d").format("YYYY-MM-DD"))):($(t).attr("data-start",moment().subtract(21,"d").format("YYYY-MM-DD")),$(t).attr("data-end",moment().format("YYYY-MM-DD"))):3==l?($(t).attr("data-start",moment().subtract(i-1,"d").format("YYYY-MM-DD")),$(t).attr("data-end",moment([n,a+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):4==l?($(t).attr("data-start",moment().subtract(i-1,"d").subtract(2,"M").format("YYYY-MM-DD")),$(t).attr("data-end",moment([n,a+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):5==l?($(t).attr("data-start",moment().subtract(i-1,"d").subtract(5,"M").format("YYYY-MM-DD")),$(t).attr("data-end",moment([n,a+1,1]).subtract(1,"d").format("YYYY-MM-DD"))):6==l&&($(t).attr("data-start",moment().subtract(i-1,"d").subtract(11,"M").format("YYYY-MM-DD")),$(t).attr("data-end",moment([n,a+1,1]).subtract(1,"d").format("YYYY-MM-DD")))})},handleCondition(e){for(let t=0;t<e.length;t++){let a=e[t];0==a.value.index?$(".select .input").val(a.name):$(".select .date li[data-start="+a.value.value.start+"][data-end="+a.value.value.end+"]").addClass("seleted").siblings().removeClass("seleted")}},liClick(){$(this).addClass("seleted").siblings().removeClass("seleted")},getData(){let e,t=$(".select").find(".input").val(),a=$(".select").find(".date .seleted");return e=t?[{name:t,value:{index:0,value:t}},{name:a.text(),value:{index:1,value:{start:a.attr("data-start"),end:a.attr("data-end")}}}]:[{name:a.text(),value:{index:1,value:{start:a.attr("data-start"),end:a.attr("data-end")}}}]},defaultDelete(){$(this).closest("li").remove()},backToStartPoint(){$(".content").scrollTop(0),$(".getMore").addClass("dn")}};t.a=i},9:function(e,t,a){"use strict";var n={list:null,content:()=>$('\n           <div class="weui-cell">\n              <div class="weui-cell__bd">\n               <input class="weui-input"  placeholder="请输入工号或姓名"/>\n             </div>\n              <div class="weui-cell__ft">\n                <span class="weui-vcode-btn query">查询</span>\n              </div>\n            </div>\n            <div class="weui-cells receip f12">\n\n            </div>\n           '),bills(e){let t=n.content();$.showbox({content:t,cls:"Additionreceipts",buttons:[{text:"关闭",click(){$.hidebox()}}],beforeShow(){n.query(e)}})},query(e){$.defs.loadingshow(),$.defs.myPost({SP_NAME:"SP_ATDC_ATTENDANCE_INFO_FEPP_LIST",m:"SELECT",QUERY:$(".Additionreceipts").find(".weui-input").val(),APPLY_EHUSER:$(".applyUser").attr("data-value"),DATE:$(".SelectedDate").find("span").text()}).then(t=>{$.defs.loadinghide(),n.list=t,$(".Additionreceipts").find(".query").on("click",()=>{n.query(e)});let a=n.billList(t),i=$(a);$(".Additionreceipts").find(".receip").html(i),$(".Additionreceipts").find(".add_rep").on("click",function(){let t=this;"function"==typeof e.span&&e.span(t)})})},billList(e){let t="";for(let a=0;a<e.length;a++)t+=`\n                <div class="weui-cell add_rep" ATDC_KY="${e[a].ATDC_KY}" style="border-bottom: 1px solid #ccc">\n                 <div class="weui-cell__bd">\n                    <p class="number"><span class="cardNumber">${e[a].ATDC_ID}</span><span class="fr cardType">${e[a].SYSV_ATDC_DESC}</span></p>\n                    <p>${e[a].ATDC_START_DT}起${e[a].ATDC_DAY}天${e[a].ATDC_HUMAN_CNT}人</p>\n                    <p>地区范围:${e[a].BSTR_NAME}</p>\n                    <p>详细地址:${e[a].ATDC_SITE}</p>\n                 </div>\n                </div>\n               `;return t}};t.a=n}});
//# sourceMappingURL=auditedlist.js.map