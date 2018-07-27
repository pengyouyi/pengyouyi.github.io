---
layout: post
title: 替换dom中的占位符
tags:
- JS-Basic
categories: JS
description: 替换dom中的占位符
---

描述：html中写了 一段带占位符的dom结构，需要你把真实数据填充进去。（下 面仅仅是 一个例 子）

test.html

```html
<div id="template-dom" class="{{m.className}}">
    <div class="user-profile">
        <div class="user-avatar">
            <img src='{{user.avatar}}'> 
        <div>
        {{m.user.name}}
    <div>
</div>

<script> // your lib code here,should exports a `render` function	</script>

<script>

var m = {
    className:"user",
    user:{
	    name:"wscn",
	    avatar:"http://notfound.com/img/notfound.png"
    }
}

render(document.getElementById('template-dom'),m) </script>
```

要求：不使 用第三 方库和框架；不允许使 用 innerHTML 和 eval ；不允许替换原始dom；只需要在chrome下运 行正确即可（不正确的也可以show code）

加分项 ：

1  支持指令 if ,  repeat 等指令

2 开发时使 用 es6

3 良好的代码 风格，优秀的测试 用例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<style>
.class1 {
	color: red;
}
#class2 {
	color: blue;
}
.class3 {
	color: green;
}
</style>                                                         
<body>

<div id="template-dom" class="{{className}}" v-if="user.name" >
	hello {{to}} ,
	<h1 class="{{user.myclass}}">我是 {{user.name}} , 今年 {{user.age}} 岁 ,很高兴认识你们</h1>
	<h2 class="{{className2}}" v-if="true">我支持if指令,测试请在元素中加入属性名为“v-if=”来测试</h2>
	<h3 class="{{user.myclass}}">我能在chrome 和Firefox 浏览器环境中运行</h3>
	<div id="{{className2}}">我不支持repeat指令,也还没来的及用ES6</div>
	<p v-if="user.name.test">我还没封装函数，不过第一题写页面样式倒是没问题</p>
</div>

<script type="text/javascript"> 
// your lib code here,should exports a `render` function	

function render(node,data) {

	//判断node是否为元素节点
	var isDOM = ( typeof HTMLElement === 'object' ) ?
        function(obj){
            return obj instanceof HTMLElement;
        } :
        function(obj){
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        };
    //去除字符串左右两边的空格
    String.prototype.trim = function() {
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }
	//去除字符串左边的空格
　　 String.prototype.ltrim = function() {
　　    return this.replace(/(^\s*)/g,"");
　　 }
	//去除字符串右两边的空格
　　 String.prototype.rtrim = function() {
　　    return this.replace(/(\s*$)/g,"");
　　 }

    //深遍历node下的所有子节点（包括后代节点）
 	function traverseNodes(node) {
 		var childNodesObj;
 		var nodeEleArr = [];
	   	var nodeTextArr = [];
 		var iterator = document.createNodeIterator(node,NodeFilter.SHOW_ALL,null,false);
 		var node = iterator.nextNode();
 		while(node !== null) {
 			if(node.nodeType === 1) {
 				nodeEleArr.push(node);
 			}else if(node.nodeType === 3){
 				nodeTextArr.push(node)
 			}
 			node = iterator.nextNode();
 		}
 		childNodesObj = {
	   		"childEleArr": nodeEleArr,
	   		"childTextArr": nodeTextArr
	   	}
 		return childNodesObj;
 	}

 	//浅遍历node下的子节点,元素节点和文本节点都保存在array
 	function getChildNodes(node) {
 		return node.childNodes;
 	}

 	//解析node的文本节点
 	function compileText(node,data) {
 		var childTextArr = traverseNodes(node).childTextArr;

 		if(childTextArr) {
 			for(var i = 0; i < childTextArr.length; i++ ) {

				var pattenNeed = /\{\{\s*([\w\.]+)\s*\}\}/g;

 				var temp;
 				var result = '';
				var preText ;
				var iIndex = 0;

 				while(temp = pattenNeed.exec(childTextArr[i].data) ){

 					preText = childTextArr[i].data.substring(iIndex,temp.index);

					iIndex = temp.index + temp[0].length;

					result += preText + getAttrResult(data,temp[1]);
	
 				}

 				result += childTextArr[i].data.substring(iIndex,childTextArr[i].data.length)

 				childTextArr[i].data = result;
		
 			}
 		}
 		
 	}


 	//判断node节点属性是否需要解析,
	function isNeedCompile(node) {

		var needCompileAttr = [];

		var attrArray = getOwnAttr(node);
		var attrArrayLen = attrArray.length;

		var patten = /^{{(.*)}}$/;

		for(var i = 0; i < attrArrayLen; i++) {

			var attrValue = node.getAttribute(attrArray[i]);

			if(typeof attrValue ==='string' && patten.test(attrValue) ) 
			{
				needCompileAttr.push(attrArray[i]);
			}
			
		}

		return needCompileAttr;

	}

	// 返回node节点HTML显示书写的属性集合
	function getOwnAttr(node) {
		var attrArray = [];
		if(node.hasAttributes()) {
			var attrs = node.attributes;
			for(var i = 0; i < attrs.length; i++ ) {
				attrArray.push(attrs[i].name)
			}
		}
		
		return attrArray;
	}
	
	//返回node节点一个属性的值，去掉“{{}}”后中间剩余的部分
	function getAttr(node,attr) {

		var attrValue = node.getAttribute(attr);
		
		var patten = /^{{(.*)}}$/g;

		if(typeof attrValue ==='string' && patten.test(attrValue) ) {
			var newAttrValue = attrValue.replace(/^{{(\s*)/g,"").replace(/(\s*)}}$/g,"");
		}

		return newAttrValue;

	}

	//解析属性值地址
	function getAttrResult(data,attrStr) {
		var result = data;
		var array = attrStr.split(".");
		for(var i = 0; i <array.length;i++) {
			result = result[array[i]]
		}
		return result;
	}

	// 解析dom节点属性
	function compile(node,attrArr,data) {
		for(var i = 0; i < attrArr.length; i++) {

			var mydata = getAttr(node,attrArr[i]);

			var rightdata = getAttrResult(data,mydata);

			if(rightdata) {
				node.setAttribute(attrArr[i],rightdata)
			}	
			
		}
		
	}

	// 判断node是否含有指令,返回所有v-**指令集合
	function getDirectives(node) {
		var attrArray = getOwnAttr(node);
		var pattenDirective = /^v-/;
		var directiveArr = [];
		for(var i = 0; i < attrArray.length; i++) {
			if(pattenDirective.test(attrArray[i])) {
				directiveArr.push(attrArray[i])
			}
			
		}
		return directiveArr;
	}

	//判断元素是否含有v-if指令，有就返回if指令的属性值
	function getIfDirective(node) {
		var directiveArr = getDirectives(node);
		var patenIf = /^v-if/;
		for(var i =0; i < directiveArr.length; i++) {
			if(patenIf.test(directiveArr[i])) {
				var ifValue = node.getAttribute(directiveArr[i])
			}
		}
		return ifValue
	}

	//解析if指令
	function compileIf(node,data) {
		var ifValue = getIfDirective(node);
		if(ifValue) {
			var parseIfValue = ifValue === "true" ? "true" : getAttrResult(data,ifValue);
			if(!parseIfValue) {
				node.parentNode.removeChild(node);
			}
		}	

	}

	//判断render()函数所传的第一个值是元素节点才解析
	if(isDOM(node)) {

		//解析所有需要解析的元素节点的属性
		var allEleArr = traverseNodes(node).childEleArr;

		for (var i = 0; i < allEleArr.length; i++) {
			var isNeedCompileAttr = isNeedCompile(allEleArr[i]);
			compile(allEleArr[i],isNeedCompileAttr,data);
			//解析if指令
			compileIf(allEleArr[i],data)

		}

		// 解析所有需要解析的文本节点
		compileText(node,data);

	} else {
		throw Error("第一个参数请输入dom节点")
	}
	
}
</script>
<script>
var m = {
	to: "Mr.Zhou",
	className:"class1",
	className2:"class2",
	user:{
		name:"彭友谊",
		age: 24,
		myclass: 'class3',
		src:"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png"
	}
};
var node = document.getElementById('template-dom');
render(node,m)

</script>


</body>
</html>
```