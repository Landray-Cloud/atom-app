<template>
<el-container>
	<el-header>
		<el-menu default-active="1" mode="horizontal" background-color="#3a4046" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item :route="{name: '/Index'}" index="1">
				<i class="el-icon-document"></i>
				<span slot="title">应用列表</span>
			</el-menu-item>
		</el-menu>
	</el-header>
	<el-main>
		<slot></slot>
	</el-main>
</el-container>
</template>

<script>
export default {
	name: 'container',
	data() {
		return {

		}
	},
	methods: {

	}
}
</script>

<style lang="less">
.el-container {
	width: 100%;
	height: 100%;
	.el-header {
		background-color: #3a4046;
	}
	.el-main {
		height:~"calc(100% - 61px)";
	}
}
.el-radio-group {
	display:inherit;
	line-height: 40px;
	vertical-align:inherit;
	font-size: 14px;
}
.el-checkbox-group {
	font-size: 14px;
}
.el-checkbox-button__original,.el-radio-button__orig-radio{
	left: 0;
}
</style>
