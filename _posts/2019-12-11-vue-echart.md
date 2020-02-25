---
layout: post
title: vue中使用echarts
tags:
- vue
categories: Framework
description: vue中使用echarts
---


# vue中使用echarts

> A Vue.js project

# 在Vue中使用echarts

**接口地址：**

本地数据

**浏览器访问如下：**

`http://localhost:8080/circle`

`http://localhost:8080/map`

# vue-echarts demo

## one.安装echarts依赖

```bash
cnpm i echarts -S
```

## two.按需引入

由于全局引入会将所有的echarts图表打包，导致体积过大
因此我们引入基本模板和部分组件。

在Echarts.vue文件中:

```js
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入pie图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend');
```

## three.初始化

```js
let myChart = echarts.init(document.getElementById('chart_example'));
```

## four.定义数据

```js
let option = {
    legend: {
		data: []
	},
	series: [{
		type: 'pie',
		data: []
	}]
};
```

## five.绘制

```js
myChart.setOption(option);
```

注意：我们要在mounted生命周期函数中实例化echarts对象。因为我们要确保dom元素已经挂载到页面中

# 完整demo示例代码

```html
<template>
  <div class="CircleChart">
  	<div class="title">vue中插入Echarts示例画pie图</div>
	<div id="circle-chart"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入组件
require('echarts/lib/chart/pie');
// 引入组件
require('echarts/lib/component/legend');

export default {
	data() {
		return {
            circleData: [{
					value: Math.round(Math.random() * 1000),
					name: '中东欧'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '西亚'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '南亚'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '东亚联盟'
				}, {
					value: Math.round(Math.random() * 1000),
					name: '独联体'
			}]
		}
	},
	mounted() {
		let myChart = echarts.init(document.getElementById('circle-chart'));
		let option = {
            legend: {
				orient: 'vertical',
				left: 'left',
				top: 'top',
				data: ['中东欧', '西亚', '南亚', '东亚联盟', '独联体']
			},
			series: [{
				type: 'pie',
				center: ['50%', '60%'],
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center',
					},
					emphasis: {
						show: true,
						fontSize: 18,
						fontWeight: 'bold',
						lineHeight: 20,
						formatter: ['{b}', '{c}', '({d}%)'].join('\n'),
						rich: {
							b: {
								color: 'black'
							}
						}
					}
				},
				data: this.circleData
			}]
		};
		myChart.setOption(option);
	}
}
</script>

<style scoped>
#circle-chart {
	width: 600px;
	height: 300px;
	margin:40px auto;
}
</style>
```

# more

- 完整项目请看github, 项目[v-echart](git@github.com:pyy-vueComponent/v-echart.git)