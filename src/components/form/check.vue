<template>
<el-form>
	<el-form-item :label="configData.title">
		<el-checkbox-group v-if="!configData.button && !configData.border" v-model="check"  size="mini">
			<el-checkbox v-for="(o, i) in configData.options" :label="o.value" :key="'check_' + new Date().getTime() + '_' + i">{{o.name}}</el-checkbox>
		</el-checkbox-group>
		<el-checkbox-group v-else-if="!configData.button && configData.border" v-model="check"  size="mini">
			<el-checkbox v-for="(o, i) in configData.options" border :label="o.value" :key="'check_border_' + new Date().getTime() + '_' + i">{{o.name}}</el-checkbox>
		</el-checkbox-group>
		<el-checkbox-group v-else-if="configData.button" v-model="check"  size="mini">
			<el-checkbox-button v-for="(o, i) in configData.options" :label="o.value" :key="'check_button' + new Date().getTime() + '_' + i">{{o.name}}</el-checkbox-button>
		</el-checkbox-group>
	</el-form-item>
</el-form>
</template>

<script>
export default {
	name: 'check',
	data() {
		return {
			check: [1],
			configData: {
				field: '',
				border: false,
				button: false,
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
