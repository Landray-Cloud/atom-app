<template>
<div class="main-container">
	<starry-sky></starry-sky>
	<el-form label-position="left" label-width="60px" class="demo-ruleForm regist-container">
		<h3 class="title">用户注册</h3>
		<el-form-item label="账号：">
			<el-input type="text"  v-model="user.account" auto-complete="off" placeholder="账号"></el-input>
		</el-form-item>
		<el-form-item label="密码：">
			<el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-form-item label="姓名：">
			<el-input type="text" v-model="user.name" auto-complete="off" placeholder="姓名"></el-input>
		</el-form-item>
		<el-form-item label="手机：">
			<el-input type="text" v-model="user.phone" @keyup.enter.native='regist' auto-complete="off" placeholder="手机"></el-input>
		</el-form-item>
		<el-form-item label="性别：">
			<el-radio v-model="user.sex" label="0">男</el-radio>
			<el-radio v-model="user.sex" label="1">女</el-radio>
		</el-form-item>
		<el-form-item label-width="0px">
			<el-button type="primary" style="width:100%" :loading="load" @click="regist">注册</el-button>
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
			user: {
				account: '',
				password: '',
				name: '',
				phone: '',
				sex: '0'
			},
			load: false
		}
	},
	methods: {
		regist() {
			let errtxt = '';
			if(this.user.phone == ''){
				errtxt = '手机不能为空';
			}
			if(this.user.name == ''){
				errtxt = '名称不能为空';
			}
			if(this.user.password == ''){
				errtxt = '密码不能为空';
			}
			if(this.user.account == ''){
				errtxt = '账号不能为空';
			}
			if(errtxt != '') {
				this.$notify.error({
					title: '错误',
					message: errtxt
				});
				return;
			}
			this.logining = true;
			let url = Util.host + '/node/regist';

			this.$http.post(url, this.user).then(res => {
				this.logining = false;
				if (res.data.errcode == 0) {
					this.$message({
						message: '恭喜你，注册成功',
						type: 'success'
					});
					this.user = {
						account: '',
						password: '',
						name: '',
						phone: '',
						sex: '0'
					}
				} else {
					this.$message.error('不好意思，注册失败了');
				}
			}, fail => {
				this.logining = false;
				console.log(fail);
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
.regist-container {
    width: 400px;
    height: 430px;
    background-color: rgba(0,0,0,0.3);
    padding: 15px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -215px;
    margin-top: -230px;
    border-radius: 5px;
    color: #fff;
    h3 {
        text-align: center;
    }
    .el-form-item__label {
        color: #fff !important;
    }
}
</style>
