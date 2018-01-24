<template>
<el-form>
	<el-form-item :label="configData.title">
		<el-select v-model="select" placeholder="请选择">
			<el-option v-for="(o, i) in configData.options" :label="o.name" :key="'select_' + new Date().getTime() + '_' + i" :value="o.value"></el-option>
		</el-select>
	</el-form-item>
</el-form>
</template>

<script>
export default {
	name: 'selectComp',
	data() {
		return {
			select: '',
			configData: {
				field: '',
				title: '标题',
				options: [{
					name: '选项1',
					value: 1
				},{
					name: '选项2',
					value: 2
				}]
			}
		}
	}
}
</script>

<style lang="less">
</style>
