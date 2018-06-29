---
layout: post
title: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第8章 hybrid
tags:
- Interview
- imooc
categories: JS
description: 慕课网-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第8章 hybrid
---

慕课网学习笔记-揭秘一线互联网企业 前端JavaScript高级面试（双越）- 第8章 hybrid

# begin

- hybrid是什么，为何要hybrid

- 介绍一下hybrid更新和上线的流程

- hybrid和h5的主要区别

- 前端JS和客户端如何通讯

# hybrid是什么

- hybrid文字解释

- 存在价值，为何会用hybrid

- webview

- file://协议

- hybrid实现流程

## hybrid是什么-开始

**hybrid文字解释**

- hybrid即“混合”，即前端和客户端的混合

- 需前端开发人员和客户端开发人员配合完成

- 某些环节也可能涉及到server端


**存在价值，为何会用hybrid**

- 可以快速迭代更新【关键】（无需APP审核）

- hybrid是纯前端代码，没有更高的权限（比如访问手机的地理位置、拍照、扫二维码等）

- 体验流畅（和NA的体验基本类似）

- 减少开发和沟通成本，双端公用一套代码

## hybrid是什么-webview

是APP中的一个组件（APP可以有webview，也可以没有）

用于加载h5页面，即一个小型的浏览器内核

## hybrid是什么-file协议

在一开始接触HTML开发，就已经使用了file协议

协议、标准

file协议：本地文件，快

HTTP(S)协议：网络加载，慢

## hybrid具体实现和总结

- 不是所有场景都适合使用hybrid

- 使用NA：体验要求极致，变化不频繁（如头条的首页）

- 使用hybrid：体验要求高，变化频繁（如头条的新闻详情页）

- 使用h5:体验无要求，不常用（如举报、反馈等页面）

**具体实现**

1. 前端做好静态页面（HTML、js、css）,将文件交给客户端

2. 客户端拿到前端静态页面，以文件形式存储在APP中

3. 客户端在一个webview中

4. 使用file协议加载静态页面

<div class="rd">
    <img src="/assets/images/2018/4-5-6/6-29-1.png" alt="">
</div>


APP发布之后，静态文件如何实时更新 ？

静态页面如何获取内容？

## hybrid更新流程

要替换每个客户端的静态文件

只能客户端来做（客户端是我们自己开发的）

客户端去server下载最新的静态文件

我们维护server的静态文件

**完整流程**

1. 分版本，有版本号

2. 将静态文件压缩成zip包，上传到服务器

3. 客户端每次启动，都要去服务端检查版本号

4. 如果服务端版本号大于客户端版本号，就去下载最新的zip包

5. 下载完之后解压包，然后将现有文件覆盖

*问题解答*

- 服务器的版本和zip包维护

- 更新zip包之前，先对比版本号

- zip下载解压和覆盖

## hybrid和h5的比较

hybrid优点：

- 体验更好，跟NA体验基本一致
- 可快速迭代，无需APP审核【关键】

hybrid缺点：

- 开发成本高。联调、测试、查bug都比较麻烦
- 运维成本高。参考此前讲过的更新上线流程

适用场景：

- hybrid: 产品的稳定功能，体验要求高，迭代频繁
- h5: 单次的运营活动（如红包）或不常用功能

# JS和客户端通讯

[微信JS-SDK接口](http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3)

## JS和客户端通讯-开始

- JS和客户端通讯的基本形式

- schema协议简介和使用

- schema使用的封装

- 内置上线


遗留问题：

新闻详情页适用hybrid，前端如何获取新闻内容？

不能用AJAX获取。第一，跨域，第二，速度慢

客户端获取新闻内容，然后JS通讯拿到内容，再渲染

**JS和客户端通讯的基本形式**

- JS访问客户端能力，传递参数和回调函数

- 客户端通过回调函数返回内容

## schema协议

schema协议-前端和客户端通讯的约定

weixin://dl/scan  扫一扫

<div class="rd">
    <img src="/assets/images/2018/4-5-6/6-29-2.png" alt="">
</div>

## schema封装

invoke.js
```js
(function (window, undefined) {

    // 调用 schema 的封装
    function _invoke(action, data, callback) {
        // 拼装 schema 协议
        var schema = 'myapp://utils/' + action

        // 拼接参数
        schema += '?a=a'
        var key
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                schema += '&' + key + data[key]
            }
        }

        // 处理 callback
        var callbackName = ''
        if (typeof callback === 'string') {
            callbackName = callback
        } else {
            callbackName = action + Date.now()
            window[callbackName] = callback
        }
        schema += 'callback=callbackName'

        // 触发
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = schema  // 重要！
        var body = document.body
        body.appendChild(iframe)
        setTimeout(function () {
            body.removeChild(iframe)
            iframe = null
        })
    }

    // 暴露到全局变量
    window.invoke = {
        share: function (data, callback) {
            _invoke('share', data, callback)
        },
        scan: function (data, callback) {
            _invoke('scan', data, callback)
        }
        login: function (data, callback) {
            _invoke('login', data, callback)
        }
    }

})(window)
```

## JS和客户端通讯-总结

将以上封装的代码打包，叫做invoke.js，内置到客户端

客户端每次启动webview，都默认执行invoke.js

本地加载，免去网络加载的时间，更快

本地加载，没有网络请求，黑客看不到schema协议，更安全


**问题解答**

通讯的基本形式：调用能力，传递参数，监听回调

对schema协议的理解和使用

调用schema代码的封装

内置上线的好处：更快更安全



# 更多-more

[揭秘一线互联网企业 前端JavaScript高级面试](https://coding.imooc.com/learn/list/190.html)

