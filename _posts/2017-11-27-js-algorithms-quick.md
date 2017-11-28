---
layout: post
title: 排序算法-快速排序
tags:
- 面试题
- 算法
categories: JS
description: 排序算法-快速排序
---

# 算法-algorithm

# 快速排序-quick sort
**算法描述**

快速排序由于排序效率在同为O(N*logN)的几种排序方法中效率较高，因此经常被采用，再加上快速排序思想----分治法也确实实用。快速排序是一种既不浪费空间又可以快一点的排序算法。

**算法步骤**

（1）先从数列中取出一个数作为“基准”

（2）建立两个数组，分别存储左边(小于或等于“基准”的数)和右边的数组(比这个“基准”大的数)

（3）利用递归,再对左右区间重复第二步，直到各区间只有一个数。

**算法实现**

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

function quickSort(arr) {

  if (arr.length <= 1) {
    return arr;  //如果数组只有一个数，就直接返回；
  }
  var len = arr.length;
  var mid = Math.floor(arr.length/2); // 基准位置（理论上可任意选取）,这里找到中间数的索引值，如果是浮点数，则向下取整
  var midValue = arr.splice(mid, 1);  // 基准数
  // arr.splice(mid,1);用于找到中间数的值，返回的是一个数组，如果使用arr[mid]则返回的是一个数值

  var leftArr = [ ];
  var rightArr = [ ];

  for(var i = 1; i < len; i++) {
    if (midValue > arr[i]) {
      leftArr.push(arr[i]);  // 基准点的左边的数传到左边数组
    } else {
      rightArr.push(arr[i]); //基准点的右边的数传到右边数组
    }
  }

  return quickSort(leftArr).concat(midValue,quickSort(rightArr));
}

console.log(quickSort(arr) );

</script>
</body>
</html>
```


# 更多-more

- [https://segmentfault.com/a/1190000009426421](https://segmentfault.com/a/1190000009426421)

- [https://segmentfault.com/a/1190000000669157](https://segmentfault.com/a/1190000000669157)
