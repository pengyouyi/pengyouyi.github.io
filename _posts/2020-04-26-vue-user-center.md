---
layout: post
title: Vue pnc用户信息个人中心
tags:
- vue
categories: Framework
description: Vue pnc用户信息个人中心
---

# Vue pnc用户信息个人中心

<div class="rd">
    <img src="/assets/images/2020/4-5-6/4-27-1.png" alt="">
</div>

src/pncPages/center/basicInfo.Vue

```html
<template>
<el-row class="basic-info-container">
	<UploadPhoto v-model="form.photo" @upload="onUpload"></UploadPhoto>
	<div class="inputs truename-input">
		<div class="label">First Name</div>
		<pncInput v-model="form.firstname" :padding="false"></pncInput>
		<div class="label lastname-label">Last Name</div>
		<pncInput v-model="form.lastname" :padding="false"></pncInput>
	</div>
	<div class="inputs username-input">
		<div class="label">Username</div>
		<pncInput v-model="form.username" :padding="false"></pncInput>
	</div>
	<div class="inputs email-input">
		<div class="label">Email</div>
		<pncInput v-model="form.email" :padding="false"></pncInput>
	</div>
	<div class="inputs birthdate-input">
		<div class="label">Birthdate</div>
		<pncInput v-model="form.birthdate" placeholder="2000-01-01" :padding="false"></pncInput>
	</div>
	<div class="inputs gender-input">
		<div class="label">Gender</div>
		<pncRadio v-model="form.gender" :radios="genders"></pncRadio>
	</div>
	<pncButton class="saveBtn" @click="onSave" shadowless>Save</pncButton>
</el-row>
</template>

<script>
	import UploadPhoto from 'pncComponents/center/uploadPhoto';
	export default {
		components: {
			UploadPhoto
		},
		data() {
			let storeForm = {
				username: this.$store.state.user.username,
				email: this.$store.state.user.email,
				firstname: this.$store.state.user.firstname,
				lastname: this.$store.state.user.lastname,
				photo: this.$store.state.user.photo,
				birthdate: this.$store.state.user.birthdate,
				gender: this.$store.state.user.gender,
			};
			return {
				form: storeForm,
				file: '',
				genders: [{
					label: 'Male',
					value: 'M'
				}, {
					label: 'Female',
					value: 'F'
				}]
			};
		},
		methods: {
			onUpload(file) {
				this.file = file;
			},
			onSave() {
				let formData = new FormData();
				formData.append('username', this.form.username);
				formData.append('email', this.form.email);
				formData.append('first_name', this.form.firstname);
				formData.append('last_name', this.form.lastname);
				formData.append('birthdate', this.form.birthdate);
				formData.append('gender', this.form.gender);
				formData.append('photo', this.file);
				this.$axios.put(this.$url.user, formData).then(res => {
					this.getUserInfo();
				}).catch(err => {
					this.$error(err);
				});
			},
			getUserInfo() {
				this.$axios.get(this.$url.user).then(res => {
					res.data.password = this.$store.state.user.password;
					this.goSetUserInfo(res.data);
				}).catch(err => {
					this.$error(err);
				});
			},
			goSetUserInfo(data) {
				this.$store.dispatch('SetUserInfo', data).then(() => {
					this.$router.push(this.$route.path);
					this.$message.success('Upload Success');
				}).catch(err => {
					console.log(err);
				});
			}
		}
	};

</script>
```

src/pncComponents/center/uploadPhoto.vue

```html
<template>
<div class="UploadPhoto" v-model="showingImg">
	<img class="photo" v-if="showingImg" :src="showingImg">
	<div class="photo" v-else><UserUploadSVG class="svg"></UserUploadSVG></div>
	<div class="photo-button">
		<el-upload class="upload" :action="url" :before-upload="beforeUpload" :show-file-list="false">
			<el-button class="upload-button" size="small" type="primary">Upload Now</el-button>
		</el-upload>
	</div>
	<div class="tip">JPG GIP or PNG, Max size of 2M</div>
</div>
</template>

<script>
	import UserUploadSVG from 'pncComponents/svg/userUpload';
	export default {
		components: {
			UserUploadSVG
		},
		props: {
			value: String
		},
		data() {
			return {
				url: 'https://jsonplaceholder.typicode.com/posts/',
				originImg: this.value
			};
		},
		computed: {
			showingImg: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val);
				}
			}
		},
		methods: {
			beforeUpload(file) {
				this.$emit('upload', file);
				this.showingImg = URL.createObjectURL(file);
				const isTypeValid = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isTypeValid) {
					this.$message.error('上传头像图片只能是 JPG GIF PNG 格式!');
				} else if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isTypeValid && isLt2M;
			},
		}
	};

</script>
```

src/store/modules/user.js

```js
state: {
  username: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).username : '',
  firstname: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).firstname : '',
  lastname: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).lastname : '',
  email: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).email : '',
  photo: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).photo : '',
  birthdate: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).birthdate : '',
  gender: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).gender : 'M',
},
mutations: {
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_FIRSTNAME: (state, firstname) => {
    state.firstname = firstname;
  },
  SET_LASTNAME: (state, lastname) => {
    state.lastname = lastname;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_PHOTO: (state, photo) => {
    state.photo = photo;
  },
  SET_BIRTHDATE: (state, birthdate) => {
    state.birthdate = birthdate;
  },
  SET_GENDER: (state, gender) => {
    state.gender = gender;
  },
},
actions: {
  //保存个人信息
  SetUserInfo({
    commit
  }, userInfo) {
    return new Promise((resolve, reject) => {
      let user = {
        username: userInfo.username,
        firstname: userInfo.first_name,
        lastname: userInfo.last_name,
        email: userInfo.email,
        photo: userInfo.photo,
        birthdate: userInfo.birthdate,
        gender: userInfo.gender,
      };
      Cookies.set('UserInfo', user);
      commit('SET_USERNAME', user.username);
      commit('SET_FIRSTNAME', user.firstname);
      commit('SET_LASTNAME', user.lastname);
      commit('SET_EMAIL', user.email);
      commit('SET_PHOTO', user.photo);
      commit('SET_BIRTHDATE', user.birthdate);
      commit('SET_GENDER', user.gender);
      resolve();
    }).catch(err => {
      console.log(err);
    });
  },
}
```

# new FormData()

[https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData)

[new FormData() - FormData对象的作用及用法](https://blog.csdn.net/AlbenXie/article/details/100103709)

## one 概述

FormData()构造函数用于创建一个新的FormData对象。它是为序列化表以及创建与表单格式相同的数据（当然是用于XHR传输）提供便利。

## two 创建一个实例

```js
var formData = new FormData(); // 当前为空
// var formData = new FormData(form)
```

## three 添加数据

```js
formData.append('username', 'Chris');
formData.append('photo', this.file);
```

## four 获取数据

```js
formData.get('username');  // Returns "Chris"
formData.getAll('username');  // Returns ["Chris", "Bob"]
```

# URL.createObjectURL()

[https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)

## one 概述

URL.createObjectURL() 静态方法会创建一个 `DOMString`，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 `document` 绑定。这个新的URL 对象表示指定的 `File` 对象或 `Blob` 对象。

```js
objectURL = URL.createObjectURL(object);
```

## two 图片预览示例

```html
<input type="file" id="btn" accept="image/*" value="点击上传" />
<img id="img"/>
```

```js
btn.addEventListener('change',function(){
	let file = this.files[0];
	// 进一步防止文件类型错误
	if(!/image\/\w+/.test(file.type)){  
        alert("看清楚，这个需要图片！");  
        return false;  
    }  
	img.src = URL.createObjectURL(file)
})
```

# el-upload 上传图片

[Vue上传文件：ElementUI中的upload实现](https://www.cnblogs.com/goloving/p/8967865.html)

[前端图片上传解决方案](https://segmentfault.com/a/1190000017781605?utm_source=tag-newest)

```html
<el-upload class="upload" :action="url" :before-upload="beforeUpload" :show-file-list="false">
  <el-button class="upload-button" size="small" type="primary">Upload Now</el-button>
</el-upload>
```

action 是一个必填参数,返回需要上传的地址
before-upload 属性上传

# axios.put

```js
this.$axios.put(this.$url.user, formData).then(...)
```
