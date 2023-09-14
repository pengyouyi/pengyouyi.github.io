---
layout: post
title: JS算法-排序算法-归并排序
tags:
- algorithm
categories: JS
description: 排序算法algorithm-归并排序
---

# 归并排序（Merge Sort）

归并排序（MERGE-SORT）是利用`归并`的思想实现的排序方法，该算法采用经典的`分治`（divide-and-conquer）策略，先进行`划分`，然后再进行`合并`。

归并排序的实现的两种方法：

> 自上而下的递归  
> 自下而上的迭代(循环)

## 空间复杂度：nLogn

# 自顶向下的归并排序(top-down)

**自顶向下的归并排序-思路：**

自顶向下的排序算法就是把数组元素不断的二分，直到子数组的元素个数为一个，因为这个时候子数组必定是已有序的，然后将两个有序的序列合并成一个新的有序的序列，两个新的有序序列又可以合并成另一个新的有序序列，以此类推，直到合并成一个有序的数组。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-27-1.png" alt="">
</div>

采用递归的方式，方法比较简洁

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
// 排序并且合并
function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }
  // 当左右数组长度不相等，将比较完之后剩下的数组连接起来
  return tmp.concat(left, right);
}

function mergeSort(array) {
  if (array.length === 1) return array;

  var mid = Math.floor(array.length / 2);
  var left = array.slice(0, mid);
  var right = array.slice(mid);

  // 递归分别对左右两部分数组进行排序合并
  return merge(mergeSort(left), mergeSort(right));
}
console.log(mergeSort(arr));

</script>
</body>
</html>
```

在《数据结构与算法JavaScript描述》中，作者却认为：[然而,在 JavaScript 中这种方式不太可行,因为这个算法的递归深度对它来讲太深了](https://www.cnblogs.com/dushao/p/6004883.html)

JavaScript没有对递归进行优化。运用递归函数不仅没有运行速度上的优势，还可能造成程序运行失败。因此不建议使用递归。

**用迭代重写递归**

[所有递归的方法都可以用迭代重写](https://www.cnblogs.com/zichi/p/4796727.html)

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
function merge(left, right) {
  var result = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      result.push(left.shift());
    else
      result.push(right.shift());
  }

  return result.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1) return a;

  var work = [];
  
  for (var i = 0, len = a.length; i < len; i++) {
    work.push([a[i]]);
  }

  work.push([]); // 如果数组长度为奇数

  for (var lim = len; lim > 1; lim = ~~((lim + 1) / 2)) {
    for (var j = 0, k = 0; k < lim; j++, k += 2) 
      work[j] = merge(work[k], work[k + 1]);

    work[j] = []; // 如果数组长度为奇数
  }

  return work[0];
}

console.log(mergeSort(arr));

</script>
</body>
</html>
```


# 自底向上的归并排序(Bottom-up)

**自底向上的归并排序-思路：**

自底向上的归并排序算法的思想就是数组中先一个一个归并成两两有序的序列，两两有序的序列归并成四个四个有序的序列，然后四个四个有序的序列归并八个八个有序的序列，以此类推，直到，归并的长度大于整个数组的长度，此时整个数组有序。需要注意的是数组按照归并长度划分，最后一个子数组可能不满足长度要求，这个情况需要特殊处理。

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-27-2.png" alt="">
</div>

自底向上可以用循环来实现。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  

var arr = [6, 10, 1, 9, 4, 8, 2, 7, 3, 5];

// 对左右序列进行排序
function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight){  
    // 建立一个左、右数组
    var rightArr = new Array(stopRight - startRight + 1);
    var leftArr = new Array(stopLeft - startLeft + 1);
    // 给右数组赋值
    k = startRight;
    for(var i = 0; i < (rightArr.length - 1); i++) {
        rightArr[i] = arr[k];
        ++k;
    }

    k = startLeft;
    for(var i = 0; i < (leftArr.length - 1); i++) {
        leftArr[i] = arr[k];
        ++k;
    }
    // 哨兵值，当左子列或右子列读取到最后一位时，即Infinity，可以让另一个剩下的列中的值直接插入到数组中
    rightArr[rightArr.length-1] = Infinity;  
    // 哨兵值, 必须
    leftArr[leftArr.length-1] = Infinity; 
    
    var m = 0;
    var n = 0;
    // 比较左子列和右子列第一个值的大小，小的先填入数组，接着再进行比较
    for(var k = startLeft; k < stopRight; k++) {
        if (leftArr[m] <= rightArr[n]) {
            arr[k] = leftArr[m];
            m++;
        } else {
            arr[k] = rightArr[n];
            n++;
        }
    }

    console.log("left:"+leftArr,"right:"+rightArr)
}

function mergeSort(arr){  

   if (arr.length < 2) {
     return;
   } 

   var step = 1;
   var left;
   var right;

   while(step < arr.length) {

     left = 0;
     right = step;

     while(right + step <= arr.length) {
       mergeArrays(arr, left, left + step, right, right + step);
       left = right + step;
       right = left + step;
     }
     if (right < arr.length) {
        mergeArrays(arr, left, left + step, right, arr.length);
     }

     step *= 2;
   }
   return arr;
}
console.log(mergeSort(arr));

</script>
</body>
</html>
```

<div class="rd">
    <img src="/assets/images/2017/10-11-12/11-27-3.png" alt="">
</div>

**[自底向上的归并排序算法实现-法二：](http://blog.csdn.net/liusaint1992/article/details/51345887)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>

<script>  

// var arr = [8, 6, 2, 3, 1, 5, 7, 4];
var arr = [6, 10, 1, 9, 4, 8, 2, 7, 3, 5];

function subSort(arr1,arr2){  
  
    var len1 = arr1.length,
        len2 = arr2.length,
        i=0,
        j=0,
        arr3=[],
        bArr1 = arr1.slice(),
        bArr2 = arr2.slice();  
  
    while (bArr1.length != 0 || bArr2.length != 0){  
        if (bArr1.length == 0){  
            arr3 = arr3.concat(bArr2);  
            bArr2.length = 0;  
        } else if (bArr2.length == 0){  
            arr3 = arr3.concat(bArr1);  
            bArr1.length = 0;  
        } else {  
            if (bArr1[0]<=bArr2[0]){  
                arr3.push(bArr1[0]);  
                bArr1.shift();  
            } else {  
                arr3.push(bArr2[0]);  
                bArr2.shift();  
            }  
        }  
    }  
    return arr3;  
}
function mergeSort(arr){  
    var len= arr.length,
        arrleft=[],
        arrright =[],
        gap=1,
        maxgap=len-1,
        gapArr=[],
        glen,
        n=0;  
    while(gap < maxgap){  
        gap = Math.pow(2,n);  
        if (gap <= maxgap){  
            gapArr.push(gap);  
        }  
        n++;  
    }  
    glen = gapArr.length;  
    for (var i = 0; i < glen; i++) {  
        gap = gapArr[i];  
        for (var j = 0; j < len; j = j + gap*2) {  
            arrleft = arr.slice(j, j + gap);  
            arrright = arr.slice(j + gap,j + gap * 2);  
            //console.log("left:"+arrleft,"right:"+arrright);  
            arr = arr.slice(0,j).concat(subSort(arrleft,arrright),arr.slice(j + gap * 2));  
        }  
    }  
    return arr;  
}
console.log(mergeSort(arr));

</script>
</body>
</html>
```


# 更多-more
- [segmentfault JavaScript排序算法（二）——归并排序](https://segmentfault.com/a/1190000006261074)

- [http://www.cnblogs.com/chengxiao/category/880910.html](http://www.cnblogs.com/chengxiao/category/880910.html)

- [十大经典算法排序总结对比](https://www.cnblogs.com/dushao/p/6004883.html)

- [自顶向下和自底向上的归并排序区别](http://blog.csdn.net/acingdreamer/article/details/53925072)

- [JavaScript排序之归并排序](http://blog.csdn.net/ansenamerson/article/details/52610538)

- [JavaScript排序算法(希尔排序、快速排序、归并排序）](http://blog.csdn.net/liusaint1992/article/details/51345887)

- [归并排序的JavaScript实现](https://www.cnblogs.com/zichi/p/4796727.html)

- [图解排序算法(四)之归并排序](http://www.cnblogs.com/chengxiao/p/6194356.html)
