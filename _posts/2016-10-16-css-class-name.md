---
layout: post
title: CSS 命名推荐
tags:
- standard
categories: CSS
description: CSS 命名推荐
---
# CSS 命名推荐

# 文件引用link

- 一律使用link的方式调用外部样式
- 不允许在页面中使用&lt;style&gt;块；
- 不允许在 &lt;style&gt;块中使用 @import；
- 不允许使用 style 属性写行内样式。

# name-组成元素

命名必须由单词、中划线-或数字组成；  
不允许使用拼音（约定俗成的除外，如：youku, baidu），尤其是缩写的拼音、拼音与英文的混合。

<pre class="badcode">
不推荐：
.xiangqing { sRules; }
.news_list { sRules; }
.zhuti { sRules; }
</pre>
<pre class="goodcode">
推荐：
.detail { sRules; }
.news-list { sRules; }
.topic { sRules; }
</pre>

# name-词汇规范
- 不依据表现形式来命名；
- 可根据内容来命名；
- 可根据功能来命名。

<pre class="badcode">
不推荐：
left, right, center, red, black
</pre>
<pre class="goodcode">
推荐：
nav, aside, news, type, search
</pre>

# name-缩写规范

- 保证缩写后还能较为清晰保持原单词所能表述的意思；
- 使用业界熟知的或者约定俗成的。

<pre class="badcode">
不推荐：
navigation   =>  navi
header       =>  head
description  =>  des
</pre>

<pre class="goodcode">
推荐：
navigation   =>  nav
header       =>  hd
description  =>  desc
</pre>

# name-前缀规范

|前缀|说明|示例
|---|---|---|
|g-|全局通用样式命名，前缀g全称为global，一旦修改将影响全站样式|g-mod|
|m-|模块命名方式|m-detail|
|ui-|组件命名方式|ui-selector|
|js-|所有用于纯交互的命名，不涉及任何样式规则。JSer拥有全部定义权限|js-switch|

选择器必须是以某个前缀开头

<pre class="badcode">
不推荐：
.info { sRules; }
.current { sRules; }
.news { sRules; }
</pre>

<pre class="goodcode">
推荐：
.m-detail .info { sRules; }
.m-detail .current { sRules; }
.m-detail .news { sRules; }
</pre>

# ID命名规范

页面框架命名，一般具有唯一性，推荐用ID命名。推荐驼峰式命名。
页面结构，导航，功能都可用

**_1)页面结构_**  
容器: container   
页头：header   
内容：content/container   
页面主体：main   
页尾：footer   
导航：nav   
侧栏：sidebar   
栏目：column   
页面外围控制整体佈局宽度：wrapper   
左右中：left right center  

**_(2)导航_**  
导航：nav   
主导航：mainnav   
子导航：subnav   
顶导航：topnav   
边导航：sidebar   
左导航：leftsidebar   
右导航：rightsidebar   
菜单：menu   
子菜单：submenu   
标题: title   
摘要: summary  

**_(3)功能_**  
标志：logo   
广告：banner   
登陆：login   
登录条：loginbar   
注册：register   
搜索：search   
功能区：shop   
标题：title   
加入：joinus   
状态：status   
按钮：btn   
滚动：scroll   
标籤页：tab   
文章列表：list   
提示信息：msg   
当前的: current   
小技巧：tips   
图标: icon   
注释：note   
指南：guild   
服务：service   
热点：hot   
新闻：news   
下载：download   
投票：vote   
合作伙伴：partner   
友情链接：link   
版权：copyright  

# 常用css命名规则  
头：header   
内容：content/container   
尾：footer   
导航：nav   
侧栏：sidebar   
栏目：column   
页面外围控制整体佈局宽度：wrapper   
左右中：left right center   
登录条：loginbar   
标志：logo   
广告：banner   
页面主体：main   
热点：hot   
新闻：news   
下载：download   
子导航：subnav   
菜单：menu   
子菜单：submenu   
搜索：search   
友情链接：friendlink   
页脚：footer   
版权：copyright   
滚动：scroll   
内容：content   
标签：tags   
文章列表：list   
提示信息：msg   
小技巧：tips   
栏目标题：title   
加入：joinus   
指南：guide   
服务：service   
注册：regsiter   
状态：status   
投票：vote   
合作伙伴：partner  


**_四、注意事项:_**  
1.一律小写;   
2.尽量用英文;   
3.不加中槓和下划线;   
4.尽量不缩写，除非一看就明白的单词。  

**_五、CSS样式表文件命名_**  
主要的 master.css   
模块 module.css   
基本共用 base.css   
布局、版面 layout.css   
主题 themes.css   
专栏 columns.css   
文字 font.css   
表单 forms.css   
补丁 mend.css   
打印 print.css  



# 更多-more
* [css属性在线重排工具](http://csscomb.com/online)
* [css在线校验](http://jigsaw.w3.org/css-validator/)
* [https://github.com/hoosin/lite/blob/master/Standard/CSS%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83.md](https://github.com/hoosin/lite/blob/master/Standard/CSS%E5%91%BD%E5%90%8D%E8%A7%84%E8%8C%83.md)
* [https://google.github.io/styleguide/htmlcssguide.xml#Protocol](https://google.github.io/styleguide/htmlcssguide.xml#Protocol)
* [http://www.h-ui.net/Hui-notes-htmlStructure.shtml](http://www.h-ui.net/Hui-notes-htmlStructure.shtml)