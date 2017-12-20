---
layout: post
title: 插入排序
tags:
- 算法
categories: JS
description: 插入排序
---

# 插入排序法 - Insertion Sort

**o(n^2)排序算法**

**思路**

将元素分成已排序、未排序两部份

1〉从第一个元素开始，该元素可以认为已经被排序

2〉取出第一个未排序元素存放在临时变量temp中，在已经排序的元素序列中从后往前扫描，逐一比较【插入时<font color="#e0e">由右而左</font>比较】

3〉如果temp小于已排序元素，将该元素移到下个位置

4〉重复步骤3〉，直到找到已排序的元素小于或者等于


|初始值|**8**|<font color="#e0e">6</font>|2|3|1|5|7|4|
|---|---|---|---|---|---|---|---|---|
|第一遍|**6**|**8**|<font color="#e0e">2</font>|3|1|5|7|4|
|第二遍|**2**|**6**|**8**|<font color="#e0e">3</font>|1|5|7|4|
|第三遍|**2**|**3**|**6**|**8**|<font color="#e0e">1</font>|5|7|4|
|第四遍|**1**|**2**|**3**|**6**|**8**|<font color="#e0e">5</font>|7|4|
|第五遍|**1**|**2**|**3**|**5**|**6**|**8**|<font color="#e0e">7</font>|4|
|第六遍|**1**|**2**|**3**|**5**|**6**|**7**|**8**|<font color="#e0e">4</font>|
|第七遍|**1**|**2**|**3**|**4**|**5**|**6**|**7**|**8**|


## Insertion Sort实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  

var arr = [8, 6, 2, 3, 1, 5, 7, 4];

function insertSort(arr) {

  var len = arr.length;

  for(var i = 1; i < len; i++) {
    // 寻找元素arr[i]合适的插入位置
    for(var j = i; j > 0; j--) {

      if(arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);
      }

    }
  }
  return arr;
}
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
console.log(insertSort(arr));

</script>
</body>
</html>
```


## Insertion Sort改进

交换两个数组的位置比比较两个位置上的值大小要耗时，

所以arr[j]比arr[j-1]大的时候，将arr[j]赋值为arr[j-1],直到找到arr[j]应该待的位置k，将arr[k]赋值为arr[j]

```js
var arr = [8, 6, 2, 3, 1, 5, 7, 4];

function insertSort(arr) {

  var len = arr.length;

  for (var i = 1; i < len; i++) {
    
    var curValue = arr[i];
    
    for (var j = i; j > 0 && curValue < arr[j-1]; j--) {

      arr[j] = arr[j-1];
  
    }
    arr[j] = curValue;
  }
  return arr;
}
console.log(insertSort(arr));
```

法二：用while语句

```js
var arr = [8, 6, 2, 3, 1, 5, 7, 4];

function insertSort(arr) {

  var len = arr.length;

  for (var i = 1; i < len; i++) {
    
    var j = i-1;
    var curValue = arr[i];

    while (curValue < arr[j]) {
       arr[j+1] = arr[j];
       j--;
    }
    
    arr[j+1] = curValue;

  }
  return arr;
}
console.log(insertSort(arr));
```

## Insertion Sort从左到右比较

插入排序法-<font color="#e0e">从左到右</font>依次比较

法一

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  

var arr = [8, 6, 2, 3, 1, 5, 7, 4];

function insertSort(arr) {

  var len = arr.length;

  for(var i = 1; i < len; i++) {

    for(var j = 0; j < i; j++) {

      if(arr[i] < arr[j]) {
        swap(arr, i, j)
      }

    }
  }
  return arr;
}
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
console.log(insertSort(arr));

</script>
</body>
</html>
```

插入排序法-<font color="#e0e">从左到右</font>依次比较

法二

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  

var arr = [8, 6, 2, 3, 1, 5, 7, 4];
var arr = [6, 9, 0, 3, 1, 5, 7, 2];
function insertSort(arr) {

  var len = arr.length;

  for (var i = 1; i < len; i++) {

    // 寻找元素arr[i]合适的插入位置
    for (var j = 0; j < i; j++) {

       if (arr[i] <= arr[j]) {
         arr.splice(j, 0, arr[i]);
       }
    }
    arr.splice(i + 1, 1);

  }
  return arr;
}
console.log(insertSort(arr));

</script>
</body>
</html>
```

插入排序有可能会提前终止，因此理论上插入排序效率比选择排序高。

# 更多-more

[http://notepad.yehyeh.net/Content/Algorithm/Sort/Insertion/1.php](http://notepad.yehyeh.net/Content/Algorithm/Sort/Insertion/1.php)