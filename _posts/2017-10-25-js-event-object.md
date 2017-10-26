---
layout: post
title: event事件对象的通用属性、方法
tags:
- js事件
categories: JS
description: event事件对象
---

# event事件对象

在触发DOM上的某个事件时，会产生一个事件对象，这个对象中包含着所有与事件有关的信息。

包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。比如，

鼠标操作导致的事件对象中，会包含鼠标位置的信息，
键盘操作导致的事件对象中，会包含与按下的键有关的信息

所有浏览器都支持event对象，但支持方式不同

# DOM中的事件对象

## DOM0级或者DOM2级事件处理程序中的event

事件处理程序（DOM0级或者DOM2级）时，浏览器都会将一个event对象传入

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="myDiv">click me</div>	
<script>
	var btn = document.getElementById("myDiv");

    btn.onclick = function(event) {
        console.log(event);
        console.log(event.type);
    }

    btn.addEventListener('click', function(e) {
        console.log(e);
        console.log(e.type);
    }, false);
   
   btn.addEventListener('click', function(myEvent, event) {
        console.log(myEvent);
        console.log(myEvent.type);
        console.log(event);
    }, false);

</script>		
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-1.png" alt="">
</div>

点击btn,给它绑定的3个事件都执行了

function(e) {} 里面传入的参数只有第一个有效，且无论参数名叫啥，它都代表event对象，所以通常给它传入 event 或者它的简写 e。


## HTML事件处理程序中的事件对象

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="myDiv" onclick="console.log(event)">event</div>	

	<div id="myDiv" onclick="console.log(event.type)">event.type</div>

	<div id="myDiv" onclick="console.log(e)">e</div>					
</body>
</html>
{% endhighlight %}

**_result display_**
<div class="rd">
    <img src="/assets/images/2017/10-11-12/10-25-2.png" alt="">
</div>

`变量event中保存着event对象`，
其他变量，比如e，都会报错，因为未定义

## event事件对象的常用属性、方法

event对象包含与创建它的特定事件有关的属性和方法。
触发的事件类型（event.type）不一样，可用的属性和方法也不一样。

不过，所有事件都会有下表列出的成员,以下读写权限都是**只读**

|属性/方法|类型|说明|
|---|---|---|
|`type`|String|被触发的事件类型|
|`target`|Element|事件的目标|
|`currentTarget`|Element|其事件处理程序当前正在处理事件的那个元素|
|cancelable|Boolean|表明是否可以取消事件的默认行为|
|`preventDefault()`|Function|`取消事件的默认行为`。如果cancelable是true,则可以使用这个方法|
|defaultPrevented|Boolean|为true表示已经调用了preventDefault()【DOM3级事件中新增】|
|eventPhase|Integer|调用事件处理程序的阶段：1表示捕获阶段，2表示处于目标阶段，3表示冒泡阶段|
|bubbles|Boolean|表明事件是否冒泡|
|`stopPropagation()`|Function|`取消事件的进一步捕获或冒泡`。如果bubbles为true,则可以使用这个方法|
|`stopImmediatePropagation()`|Function|取消事件的进一步捕获或冒泡。同时阻止任何事件(相同事件类型)处理程序被调用【DOM3级事件中新增】|
|trusted|Boolean|为true表示事件时浏览器生成的。为false表示事件是由开发人员通过JavaScript创建的【DOM3级事件中新增】|
|detail|Integer|与事件相关的细节信息|
|view|AbstractView|与事件关联的抽象视图。等同于发生事件的window对象|

<br>

- this === currentTarget  
- target是事件真正的目标  
- 当 eventPhase = 2 时，this = target = currentTarget

在需要通过一个函数处理多个事件时，可以使用type属性

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="myDiv">click me</div>	
<script>
	var btn = document.getElementById("myDiv");

    var handler = function(event) {
        switch(event.type) {
            case 'click':
                console.log('clicked');
                break;
            case 'mouseover':
               event.target.style.backgroundColor = 'red';
                break;
            case 'mouseout':
               event.target.style.backgroundColor = '';
                break;
        }
    };

    btn.onclick = handler;
    btn.onmouseover = handler;
    btn.onmouseout = handler;
    
</script>		
</body>
</html>
{% endhighlight %}

**取消事件默认行为**

{% highlight html linenos %}
<a id="test" href="http://www.cnblogs.com">链接</a>
<script>
test.onclick = function(e){
    e.preventDefault();
    // window.event.returnValue = false;  // IE
}
</script>
{% endhighlight %}


**阻止事件冒泡**
{% highlight js linenos %}
var btn = document.getElementById("myBtn");
btn.onclick = function(e) {
    console.log('btn clicked');
    e.stopPropagation();
    // window.event.cancelBubble = true;  // IE
};

document.body.onclick = function(e) {
    console.log('body clicked');
}
{% endhighlight %}


理解`stopImmediatePropagation()`

stopImmediatePropagation()阻止的是同一类事件类型被执行

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<div id="myDiv">click me</div>	
<script>
	var btn = document.getElementById("myDiv");

    btn.addEventListener('click', function(e) {
        console.log('click one');
        e.stopImmediatePropagation();
    }, false);

    btn.addEventListener('click', function() {
        console.log('click two');
    }, false);

    btn.addEventListener('mouseover', function() {
         console.log('mouseover');
    }, false);
    
</script>		
</body>
</html>
{% endhighlight %}

结果：
鼠标移上去打印 mouseover，点击打印 click one



**note**

只有在事件处理程序执行期间，event对象才会存在；
一旦事件处理程序完成，event对象就会被销毁。

# IE中的事件对象

## IE中使用DOM0级事件处理程序的event

在使用DOM0级方法添加事件处理程序时，event对象作为window对象的一个属性存在

```js
var btn = document.getElementById("myBtn");
btn.onclick = function() {
    var event = window.event;
    console.log(event.type); // "click"
}
```

通过`window.event`来获取event对象

## IE中DOM2事件处理程序的event

如果事件程序是使用attachEvent()添加的，那么就会有一个`event对象作为参数`传入事件处理程序函数中。

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(event) {
    console.log(event.type); // "click"
    // console.log(window.event.type); // "click"
});
```

使用attachEvent()的情况下，也可以通过window对象来访问event对象，就像使用DOM0级方法时一样。

## IE中HTML事件处理程序的event

通过`event变量`来访问event对象，与DOM中的事件模型相同

```html
<input type="button" value="click me" onclick="alert(event.type)">
```

## IE中的事件对象通用属性和方法

IE中的事件对象都会包含下表所列的属性和方法

|属性/方法|类型|说明|读/写|
|---|---|---|---|
|type|String|被触发的事件类型|只读|
|srcElement|Element|事件目标【 target 】|只读|
|returnValue|Boolean|默认值为true，将其设置为false就可以取消事件的默认行为【 preventDefault() 】|读/写|
|cancelBubble|Boolean|默认值为false，将其设置为true就可以取消事件冒泡【 stopPropagation() 】|读/写|

<br>

- IE中DOM0级事件处理程序，this 可能= srcElement   
- IE中DOM2级事件处理程序，this = window

{% highlight js linenos %}
var btn = document.getElementById("myBtn");

btn.onclick = function() {
    console.log(this === window.event.srcElement);  // true
};

btn.attachEvent('onclick', function(event) {
    console.log(this === event.srcElement);  // false
    console.log(this === window);  // true
});
{% endhighlight %}

**IE取消事件默认行为**

{% highlight html linenos %}
<a id="test" href="http://www.cnblogs.com">链接</a>
<script>
test.onclick = function(e){
    window.event.returnValue = false; 
    // e.preventDefault();  // DOM标准
}
</script>
{% endhighlight %}


**IE阻止事件冒泡**
{% highlight js linenos %}
var btn = document.getElementById("myBtn");
btn.onclick = function(e) {
    console.log('btn clicked');
    window.event.cancelBubble = true;  
    // e.stopPropagation(); // DOM标准
};

document.body.onclick = function(e) {
    console.log('body clicked');
}
{% endhighlight %}

# 跨浏览器事件对象event

{% highlight js linenos %}
var EventUtil = {
    // 添加事件
    addHandler: function(element, type, fn) {
      if (element.addEventListener) {
          element.addEventListener(type, fn, false);
      } else if (element.attachEvent) {
          element.attachEvent("on" + type, fn);
      } else {
          element['on' + type] = fn;
      }
    },
    // 移除事件
    removeHandle: function(element, type, fn) {
      if (element.removeEventListener) {
          element.removeEventListener(type, fn, false);
      } else if (element.detachEvent) {
          element.detachEvent("on" + type, fn);
      } else {
          element['on' + type] = fn;
      }
    },
    // 获取事件对象
    getEvent: function(event) {
        return event ? event : window.event;
    },
    // 获取事件目标
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    // 阻止事件默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}
{% endhighlight %}

使用EventUtil对象

**获取事件目标**

```js
var btn = document.getElementById('myBtn');
btn.onclick = function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
}
```

**阻止事件默认行为**

```js
var btn = document.getElementById('myBtn');
btn.onclick = function(event) {
    event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);
}
```

**阻止事件冒泡**

```js
var btn = document.getElementById('myBtn');
btn.onclick = function(event) {
    event = EventUtil.getEvent(event);
    EventUtil.stopPropagation(event);
}
```

# 更多-more

[https://developer.mozilla.org/en-US/docs/Web/API/Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)