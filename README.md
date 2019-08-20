## 运用的知识
* KOA2+SASS+JQuery+artTemplate+ES6+webpack

## tools 封装的工具类   
+ cacheToken &ensp; access_token的封装类   
+ common &ensp;  一些公用的方法
+ encrypt &ensp; 加密解密
+ fetch &ensp; 与后台交互
+ token  &ensp; 处理企业微信刚进入OA首页时access_token的逻辑


## 后台配置文件  web_config.js
***
### SECRET_CONFIG 与后台数据交互配置
* KEY  &ensp;  加/解密密钥
* IV  &ensp;   向量
* POST_URL   &ensp;  OA数据交互url
* DB_NAME   &ensp;   OA目标数据库
* UPLOAD_URL &ensp;  上传图片url
* DOWNLOAD_URL &ensp; 下载图片url
* CACHE_URL  &ensp;  redis缓存url
* CACHE_NUMBER &ensp; redis的Dbnumber
***
### EMAIL_CONFIG  阿里邮箱配置
- 供OA报销单发送邮箱使用
***
### runtime 
+ 上传图片的缓存路径
***
## 前端源码 KOAbefore
+ 待审核列表页中，/summary中报销有全选和总计，/mylist中没有，故如果需要，就将auditedConfig路由“”路径换成/summary
_ _ _
### 前端缓存
+ version - 版本号
+ status -  刷新页面时控制noticeList的弹出
+ audited - 记录从其他页面返回审核列表时的审核类型
+ MoreDate - 记录查看更多弹窗的选择条件
+ DATE - 记录另四个模块弹窗的选择条件
+ auditMore - 记录从其他页面返回查看更多页面时的审核类型
_ _ _

### 前端路由
[simple_spa文档](http://114.55.137.37/gitbook/simple_spa/)


##项目运行
npm start

## 测试用例
[测试用例npm及范例](https://www.npmjs.com/package/supertest)
[koa测试用例范例](https://github.com/ChenShenhai/koa2-note/blob/master/note/test/unit.md)


