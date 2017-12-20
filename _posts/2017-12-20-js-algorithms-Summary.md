---
layout: post
title: 排序算法总结
tags:
- 算法
categories: JS
description: 排序算法总结
---

# 排序算法总结-Summary

- 基本排序算法：冒泡排序、选择排序、插入排序

- 高级排序算法：希尔排序、归并排序、快速排序

- 其他排序算法：堆排序、基数排序等。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/12-20-2.png" alt="">
</div>

# [冒泡排序 - bubble Sort](http://pengyouyi.site/js/2017/12/20/js-algorithms-bubbleSort)

## bubble Sort 思路

对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端，最终达到完全有序

<div class="rd">
    <img src="/assets/images/2017/10-11-12/12-20-1.png" alt="">
</div>

## bubble Sort 实现

```js

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
```

# [选择排序 - Selection Sort](http://pengyouyi.site/js/2017/12/19/js-algorithms-selectSort)

## Selection Sort 思路
在要排序的一组数中，选出最小（或者最大）的一个数与<font color="#e0e">第1个位置</font>的数交换；

然后在剩下的数当中再找最小（或者最大）的与<font color="#e0e">第2个位置</font>的数交换，

依次类推，直到第n-1个元素（倒数第二个数）和第n个元素（最后一个数）比较为止。

## Selection Sort 实现

```js
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
```

# [插入排序 - Insertion Sort](http://pengyouyi.site/js/2017/12/20/js-algorithms-insertSort)

## Insertion Sort 思路

将元素分成已排序、未排序两部份

1〉从第一个元素开始，该元素可以认为已经被排序

2〉取出第一个未排序元素存放在临时变量temp中，在已经排序的元素序列中<font color="#e0e">从后往前</font>扫描，逐一比较

3〉如果temp小于已排序元素，将该元素移到下个位置

4〉重复步骤3〉，直到找到已排序的元素小于或者等于

## Insertion Sort 实现

```js
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
```

# [快速排序 - quick sort](http://pengyouyi.site/js/2017/11/28/js-algorithms-quick)

## quick sort 思路

（1）先从数列中取出一个数作为“基准”，通常取中间数

（2）建立两个数组，分别存储左边(小于或等于“基准”的数)和右边的数组(比这个“基准”大的数)

（3）利用递归,再对左右区间重复第二步，直到各区间只有一个数。

## quick sort 实现

```js
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
```

# [希尔排序 - shell sort](http://pengyouyi.site/js/2017/11/28/js-algorithms-shell)

# [归并排序 - Merge Sort](http://pengyouyi.site/js/2017/11/27/js-algorithms-merge)

# [堆排序-heap sort](http://pengyouyi.site/js/2017/11/30/js-algorithms-stack)

# [堆栈、队列、链表 data structure](https://juejin.im/entry/58759e79128fe1006b48cdfd)


# 更多-more

- [https://segmentfault.com/a/1190000009426421](https://segmentfault.com/a/1190000009426421)

- [十大经典算法排序总结对比](https://www.cnblogs.com/dushao/p/6004883.html)

- [http://www.cnblogs.com/chengxiao/category/880910.html](http://www.cnblogs.com/chengxiao/category/880910.html)