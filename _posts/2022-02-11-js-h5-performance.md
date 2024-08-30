---
layout: post
title: 如果一个H5很慢，如何排查性能问题【Chrome Performance分析、lighthouse分析】
tags:
- Interview
- optimize
categories: Tool
description: 如果一个H5很慢，如何排查性能问题
---

# 如果一个H5很慢，如何排查性能问题

❶ 通过 Chrome Performance 分析  
❷ 使用 lighthouse 分析  

## ❶ 通过 Chrome Performance 分析

**前端性能指标**

- First Paint (FP)  
- First Contentful Paint (FCP)   
- DomContentLoaded (DCL)  
- Largest Contentfull Paint (LCP)  
- Load (L)

**Chrome devTools**

- Performace 可查看上述性能指标，并有网页快照  
- Network 可以查看各个资源的加载时间  

**Performace 查看 DCL、FP、FCP、LCP、L**

❶ 打开谷歌浏览器控制台的 Perfoamance，勾选Screenshots,  
❷ 输入网址，不回车，  
❸ 点击控制台左上角的原形方按钮，开始，  
❹ 回车页面，  
❺ 页面刷新出来之后，点击stop按钮，  
❻ 查看 Timings中的DCL、FP、FCP、LCP、L  


## ❷ 使用 lighthouse 分析

Lighthouse

- 非常流行的第三方性能评测工具  
- 支持移动端和PC端  

Lighthouse 会出一个测试报告，还会出优化建议

① 控制台安装 Lighthouse
```
npm i ligthhouse -g
```
② 用 lighthouse 测试某个网站
```
lighthouse https://www.pengyouyi.site --view --preset=desktop
```

**【总结：】**

识别问题：哪里慢？

- 加载慢？
- 渲染慢？

**如果是网页加载慢**

- 优化服务端硬件配置，使用 CDN 
- 路由懒加载，大组件异步加载--减少主包的体积  
- 优化 HTTP 缓存策略  

**如果是网页渲染慢**

- 优化服务端接口（如 Ajax 获取数据慢）  
- 继续分析，优化前端组件内部的逻辑（参考 Vue React 优化）  
- 服务端渲染 SSR  

**持续跟进优化**

- 性能优化是一个循序渐进的过程，不像 bug 一次性解决  
- 持续跟进统计结果，再逐步分析性能瓶颈，持续优化  
- 可使用第三方统计服务，如阿里云 ARMS、百度统计  


  


