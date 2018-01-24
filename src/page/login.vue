<template>
<div class="main-container">
	<starry-sky></starry-sky>
	<el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
		<h3 class="title">系统登录</h3>
		<el-form-item>
			<el-input type="text" v-model="account" auto-complete="off" placeholder="账号"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input @keyup.enter.native="login" type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-checkbox class="checked" v-model="remeber">记住用户名和密码</el-checkbox>
			<el-button type="primary" style="width:100px" @click="login" :loading="logining">登录</el-button>
			<el-button plain @click="regist">注册</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import starrySky from '@/components/starry-sky';
import Util from '@/util.js';

export default {
	data() {
		return {
			account: '',
			password: '',
			checked: false,
			logining: false,
			remeber: false
		}
	},
	mounted() {
		Util.delCookie('NODEYWORK');
		if(Util.getCookie('LOGININFO')){
			this.account = JSON.parse(Util.getCookie('LOGININFO')).account;
			this.password = JSON.parse(Util.getCookie('LOGININFO')).password;
			this.remeber = true;
		}
	},
	methods: {
		login() {
			if (this.account == '') {
				this.$notify.error({
					title: '错误',
					message: '账号不能为空'
				});
				return;
			}
			if (this.password == '') {
				this.$notify.error({
					title: '错误',
					message: '密码不能为空'
				});
				return;
			}
			this.logining = true;
			let url = Util.host + '/node/login?account=' + this.account + '&password=' + this.password;
			this.$http.get(url, {
				withCredentials: true
			}).then(res => {
				this.logining = false;
				if (res.data.errcode == 0) {
					if(this.remeber) {
						Util.setCookie('LOGININFO', JSON.stringify({account: this.account, password: this.password}), 7*24);
					}else{
						Util.delCookie('LOGININFO');
					}
					this.$message({
						message: '欢迎回来',
						type: 'success'
					});
					this.$router.push({name: 'Index'});
				} else {
					this.$message.error('用户名或密码错误了');
				}
			}, fail => {
				this.logining = false;
				console.log(fail);
			});
		},
		regist() {
			this.$router.push({
				name: 'Regist'
			});
		}
	},
	components: {
		starrySky
	}
}
</script>

<style lang="less">
.main-container {
    height: 100%;
    width: 100%;
}

.login-container {
    padding: 15px;
    background-color: #e1e1e1;
    width: 350px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -175px;
    margin-top: -125px;
    border-radius: 5px;
	.checked {
		margin-right: 20px;
		&:hover {
			color: #0983f4;
		}
	}
}
</style>
