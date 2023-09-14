---
layout: post
title: JS算法-冒泡排序
tags:
- algorithm
categories: JS
description: 冒泡排序
---

# 冒泡排序 - bubble Sort

**o(n^2)排序算法**

**思路**

对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端，最终达到完全有序


<div class="rd">
    <img src="/assets/images/2017/10-11-12/12-20-1.png" alt="">
</div>


## bubble Sort实现

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

function bubbleSort(arr) {

  var len = arr.length;

  for (var i = len; i > 0; i--) {

    for (var j = 0; j < i - 1; j++) {

       if (arr[j] > arr[j + 1]) {
         swap(arr, j, j + 1);
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
console.log(bubbleSort(arr));

</script>
</body>
</html>
```

# 更多-more

[http://www.cnblogs.com/chengxiao/p/6103002.html](http://www.cnblogs.com/chengxiao/p/6103002.html)