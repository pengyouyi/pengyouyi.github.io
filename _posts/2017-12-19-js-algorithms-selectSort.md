---
layout: post
title: 选择排序
tags:
- 算法
categories: JS
description: 选择排序
---

# 选择排序法 - Selection Sort

**o(n^2)排序算法**

**思路**

在要排序的一组数中，选出最小（或者最大）的一个数与<font color="#e0e">第1个位置</font>的数交换；然后在剩下的数当中再找最小（或者最大）的与<font color="#e0e">第2个位置</font>的数交换，依次类推，直到第n-1个元素（倒数第二个数）和第n个元素（最后一个数）比较为止。

|初始值|8|6|2|3|<font color="#e0e">1</font>|5|7|4|
|---|---|---|---|---|---|---|---|---|
|第一遍|**1**|6|<font color="#e0e">2|3|8|5|7|4|
|第二遍|**1**|**2**|6|<font color="#e0e">3</font>|8|5|7|4|
|第三遍|**1**|**2**|**3**|6|8|5|7|<font color="#e0e">4</font>|
|第四遍|**1**|**2**|**3**|**4**|8|<font color="#e0e">5</font>|7|6|
|第五遍|**1**|**2**|**3**|**4**|**5**|8|7|<font color="#e0e">6</font>|
|第六遍|**1**|**2**|**3**|**4**|**5**|**6**|<font color="#e0e">7</font>|8|
|第七遍|**1**|**2**|**3**|**4**|**5**|**6**|**7**|8|

操作方法：

第一趟：从a[0]到a[n-1]中找到最小的数a[i]，然后将a[i]与a[0]交换，  
第二趟：从a[1]到a[n-1]中找到最小的数a[j]，然后将a[j]与a[1]交换,  
第三趟：从a[2]到a[n-1]中找到最小的数a[k], 然后将a[k]与a[2]交换 ……

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

function selectSort(arr) {
  var len = arr.length;
  for(var i = 0; i < len - 1; i++) {
    // 初始化[i,len) 区间最小值的索引为i
    var minIndex = i;
    //寻找 [i,len) 之间的最小值，记录其索引
    for(var j = i + 1; j < len; j++) {
      if(arr[minIndex] > arr[j]){
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
  return arr;
}
// 交换元素arr[i] 与 arr[j]
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(selectSort(arr));

</script>
</body>
</html>
```


# 更多-more

[bubkoo 选择排序](http://bubkoo.com/2014/01/13/sort-algorithm/selection-sort/)

[segmentfault javascript 排序算法之选择排序、插入排序](https://segmentfault.com/a/1190000011597883)