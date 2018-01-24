<template>
<el-form>
	<el-form-item :label="configData.title">
		<el-radio-group v-model="radio"  size="mini" v-if="!configData.button && !configData.border">
			<el-radio v-for="(o, i) in configData.options" :key="'radio_' + new Date().getTime() + '_' + i" :label="o.value">{{o.name}}</el-radio>
		</el-radio-group>
		<el-radio-group v-model="radio"  size="mini" v-if="!configData.button && configData.border">
			<el-radio v-for="(o, i) in configData.options" border :key="'radio_border' + new Date().getTime() + '_' + i" :label="o.value">{{o.name}}</el-radio>
		</el-radio-group>
		<el-radio-group v-model="radio"  size="mini" v-if="configData.button">
			<el-radio-button v-for="(o, i) in configData.options" :key="'radio_button_' + new Date().getTime() + '_' + i" :label="o.value">{{o.name}}</el-radio-button>
		</el-radio-group>
	</el-form-item>
</el-form>
</template>

<script>
export default {
	name: 'radio',
	data() {
		return {
			radio: '1',
			configData: {
				field: '',
				border: false,
				button: false,
				title: '标题',
				options: [{
					name: '选项1',
					value: '1'
				},{
					name: '选项2',
					value: '2'
				}]
			}
		}
	}
}
</script>

<style lang="less">
</style>
