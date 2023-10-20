---
layout: post
title: H5页面如何进行首屏优化
tags:
- BOM
- Interview
- optimize
categories: JS
description: H5页面如何进行首屏优化
---

# H5页面如何进行首屏优化

❶ 路由懒加载

- 适用 SPA （不适用 MPA）  
- 路由拆分，优先保证首页加载  

❷ 服务端渲染 SSR

- 传统的前后端分离（SPA）渲染页面的过程复杂  
- SSR 渲染页面 过程简单，所有性能好  
- 如果是纯 H5 页面，SSR 是性能优化的终极方案  


SSR 是一门“古老”的技术

- 刚刚兴起 web1.0 时，就是 SSR 技术： PHP ASP JSP  
- Nuxt.js(Vue)  
- Next.js(React)  

❸ App 预取

- 如果 H5 在 APP webview 中展示，可使用 APP 预取  
- 用户访问列表时，APP预加载文章首屏内容  
- 用户进入 H5 页，直接从 APP 中获取内容，瞬间展示首屏  

❹ 分页

- 针对列表页  
- 默认只展示第一页内容  
- 上划加载更多  


❺ 图片懒加载 lazyLoad

- 针对详情页  
- 默认只展示文本内容，然后触发图片懒加载  
- 注意：提前设置图片尺寸，尽量只重绘不重排

❻ Hybrid

- 提前将 HTML JS CSS 下载到 APP内部  
- 在 APP webview 中使用 file://协议加载页面文件  
- 再用 Ajax 获取内容并展示（也结合APP预取）  