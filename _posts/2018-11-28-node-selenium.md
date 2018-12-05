---
layout: post
title: selenium的node实现-对一个网站进行批量注册
tags:
- node
categories: Command-Line
description: selenium的node实现-对一个网站进行批量注册
---

# selenium的node实现-对一个网站进行批量注册

**需求:在一个网站根据邮箱、用户名、自动生成的密码进行批量注册**

## 环境搭建-Environment building

用js搭建selenium真的很简单！你需要的仅仅是浏览器（以chrome为例）、chromedriver、node及selenium-webdriver模块.

1. 本地安装node.

2. 本地安装一款浏览器（肯定都有吧，用自己喜欢的就好），并安装与其对应的浏览器驱动，例如我下载的是chromedriver.exe -v2.33。（国内镜像https://npm.taobao.org/mirrors/chromedriver/）

3. 将驱动chromedrive.exe存于 C:/demo/ 下，将 C:/demo/ 加入到系统环境变量

4. 创建个目录准备试码了。在该目录下安装npm模块selenium-webdriver，npm install selenium-webdriver

## 自动注册-automatic logon

非常厉害的自动注册代码，老公儿指导的

```js
process.on('uncaughtException', function(err){ //容错 非必需
  console.log("意外的错误: " + err.stack);
});
var fs = require('fs')
var webdriver = require('selenium-webdriver'),
By = webdriver.By,
Key = webdriver.Key;
let chrome = require('selenium-webdriver/chrome');
var dr = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build()


//核心
// dr.get('http://www.baidu.com')      //打开百度页面
dr.get('http://test.pandanc.com/english/register')      //打开注册页面

data = [
    {
    	username: "tes_zhuce_111e1",
    	email: "tes_zhuce_1411@qq.com",
    	password1: "tests_zhuce1",
    	password2: "tests_zhuce1"
    },
    {
    	username: "tes_zhuce_222e1",
    	email: "tes_zhuce_2422@qq.com",
    	password1: "tests_zhuce2",
    	password2: "tests_zhuce2"
    },
    {
    	username: "tes_zhuce_333e1",
    	email: "tes_zhuce_3343@qq.com",
    	password1: "tests_zhuce3",
    	password2: "tests_zhuce3"
    }
];


var length = data.length;

(async function() {
    for(var i = 0; i < length; i++) {
    	// 清除cookie
        await dr.manage().deleteAllCookies();
    	// 打开页面
    	//await dr.get('http://www.baidu.com');
    	await dr.get('http://test.pandanc.com/english/register');

    	dr.executeScript(function(){  
        // console.log(arguments[0][arguments[1]]) 
        // 注册
		    vue.form.username = arguments[0][arguments[1]].username;
			  vue.form.email = arguments[0][arguments[1]].email;
			  vue.form.password1 = arguments[0][arguments[1]].password1;
			  vue.form.password2 = arguments[0][arguments[1]].password2;
		    var a = document.getElementById("btnRegister");
	        a.click(); 
        }, data, i);
        // 等待2s
        await dr.sleep(2*1000);
    }
})()
```

以上文件保存为 zhuce.js

进入cmd 命令行条件下，

```bash
node zhuce.js
```

# password自动生成

密码自动生成可以用以下两种裤：

- [password-generator](https://www.npmjs.com/package/password-generator)

- [generate-password](https://www.npmjs.com/package/generate-password)

我使用的是 password-generator

新建一个目录 password-test

```bash
$ npm install password-generator -g
cd password-test
npm install password-generator --save
```

在password-test文件夹下新建password.js

```js
var generatePassword = require("password-generator");
 
var maxLength = 18;
var minLength = 12;
var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;
 
function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}
 
function customPassword() {
  var password = "";
  var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
}
 
//console.log(customPassword());
var length = 10;
for (var i = 0; i < length; i++) {
  console.log(customPassword());
}
```

打印出随机生成的多少个密码，cmd执行

```
node password.js
```


# 更多selenium相关

[selenium的node实现——基础篇](http://dingdong.io/tech/selenium%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95%E7%9A%84node%E5%AE%9E%E7%8E%B0.html)

[selenium手把手教你配置](https://blog.csdn.net/feng1gb/article/details/79471263)

[chromedriver与chrome的对应关系表](https://blog.csdn.net/weixin_42244754/article/details/81541894)

[Instance Methods](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html)