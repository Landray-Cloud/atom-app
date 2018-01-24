<template>
<container>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item :to="{ path: '/Index' }">应用列表</el-breadcrumb-item>
		<el-breadcrumb-item>编辑</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="edit-container">
		<div class="left">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>组件</span>
				</div>
				<el-collapse v-model="active">
					<el-collapse-item name="1">
						<template slot="title">
                            <i class="header-icon el-icon-info"></i> 表单
                        </template>
						<div class="comp-list">
							<draggable v-model="formComp" :options="comOptions" @choose="dragStart">
								<div class="comp-one" v-for="fc in formComp">
									<div class="comp-icon">
										<i :class="fc.icon"></i>
									</div>
									<div class="comp-text">{{fc.name}}</div>
								</div>
							</draggable>
						</div>
					</el-collapse-item>
					<el-collapse-item name="2">
						<template slot="title">
                            <i class="header-icon el-icon-info"></i> 列表
                        </template>
					</el-collapse-item>
					<el-collapse-item name="3">
						<template slot="title">
                            <i class="header-icon el-icon-info"></i> 新闻
                        </template>
					</el-collapse-item>
					<el-collapse-item name="4">
						<template slot="title">
                            <i class="header-icon el-icon-info"></i> 图片
                        </template>
					</el-collapse-item>
					<el-collapse-item name="5">
						<template slot="title">
                            <i class="header-icon el-icon-info"></i> 其他
                        </template>
					</el-collapse-item>
				</el-collapse>
			</el-card>
		</div>
		<div class="right">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>配置</span>
				</div>
				<el-form v-if="configData" label-width="90px">
					<el-form-item label="绑定字段：">
						<el-input size="small" v-model="configData.field"></el-input>
					</el-form-item>
					<el-form-item v-if="configData.border !== undefined" label="边框：">
						<el-switch v-model="configData.border"></el-switch>
					</el-form-item>
					<el-form-item v-if="configData.button !== undefined" label="按钮：">
						<el-switch v-model="configData.button"></el-switch>
					</el-form-item>
					<el-form-item label="标题：">
						<el-input size="small" v-model="configData.title"></el-input>
					</el-form-item>
					<el-form-item label="选项：">
						<div class="radio-config-option" v-for="(o, i) in configData.options">
							名称：
							<el-input size="small" style="width:75px" v-model="o.name"></el-input>
							值：
							<el-input size="small" style="width:55px" v-model="o.value"></el-input>
							<el-button type="text" @click="delOption(i)" icon="el-icon-delete"></el-button>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button size="small" @click="addOptions">新增选项</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
		<div class="middle">
			<phone>
				<div v-if="compnames.length == 0" class="err-tip">
					<i class="fa fa-hand-o-left"></i> 容器内暂无组件<br />请从左侧 组件库(组件母版) 拖入组件到此区域
				</div>
				<draggable v-model="compnames" :options="comOptions1">
					<div class="comp-div" :class="{ click: com.select }" @click="compClick(com, i)" v-for="(com, i) in compnames" :key="com.id">
						<i class="fa fa-times-circle" v-show="com.select" @click.stop="delComp(i)"></i>
						<component :is="comps[com.comp]" :ref="com.id"></component>
					</div>
				</draggable>
			</phone>
		</div>
	</div>
</container>
</template>

<script>
import Container from '@/components/container';
import Phone from '@/components/phone';
import Compjson from '@/file/components';
import Draggable from 'vuedraggable';
import AllComp from '@/file/import';

export default {
	name: 'edit',
	components: {
		Container,
		Phone,
		Draggable
	},
	computed: {
		comOptions() {
			return {
				animation: 150,
				sort: false,
				group: {
					name: 'page',
					pull: 'clone',
					put: false
				}
			}
		},
		comOptions1() {
			return {
				animation: 150,
				group: {
					name: 'page',
					pull: true,
					put: true
				}
			}
		}
	},
	data() {
		return {
			active: ['1'],
			tabActive: 'first',
			time: new Date().Format('hh:mm'),
			formComp: Compjson.form,
			comps: AllComp,
			compnames: [],
			configData: ''
		}
	},
	mounted() {
		this.timeInit();
	},
	methods: {
		timeInit() {
			setInterval(_ => {
				this.time = new Date().Format('hh:mm');
			}, 1000);
		},
		delComp(i) {
			if (this.compnames[i].select) {
				this.configData = false;
			}
			this.compnames.splice(i, 1);
		},
		compClick(com, index) {
			if(!com.select){
				this.compnames.forEach((item) => {
					item.select = false;
				});
				com.select = true;
				// console.log(this.$refs[com.id]);
				this.configData = this.$refs[com.id][0].configData;
			}
		},
		dragStart(e) {
			this.formComp[e.oldIndex].id = 'comp_' + new Date().getTime();
		},
		addOptions() {
			let len = this.configData.options.length + 1;
			this.configData.options.push({
				name: '选项' + len,
				value: len
			});
		},
		delOption(i) {
			this.configData.options.splice(i, 1);
		}
	}
}
</script>

<style lang="less">
.edit-container {
    position: relative;
    padding: 20px 20px 0 0;
    width: 100%;
    height: ~"calc(100% - 34px)";
    .left,
    .right {
        background-color: #fff;
        width: 300px;
        height: 100%;
        float: left;
        .box-card {
            height: 100%;
            .el-card__body {
                padding: 0;
                height: ~"calc(100% - 60px)";
                .el-tabs--border-card {
                    height: 100%;
                }
            }
            .el-collapse {
                border-top: 0;
                .el-collapse-item__header {
                    padding: 0 10px;
                }
            }
        }
    }
    .left {
        .comp-list {
            border-top: 1px solid #ebeef5;
            .comp-one {
                cursor: pointer;
                width: 93px;
                float: left;
                text-align: center;
                border: 3px solid #fff;
                &:hover {
                    border-color: #5975d7;
                }
                .comp-icon {
                    font-size: 30px;
                }
            }
            .sortable-ghost {
                visibility: visible;
                &::after {
                    content: '';
                    display: none;
                }
            }
        }
    }
    .right {
        width: 350px;
        float: right;
        .el-card__body {
            padding: 10px !important;
            height: ~"calc(100% - 80px)" !important;
        }
        .radio-config-option {
            margin-bottom: 10px;
        }
		.el-form-item {
			margin-bottom: 10px;
		}
    }
    .middle {
        margin: 0 350px 0 300px;
        height: 100%;
        background-color: #ccc;
        position: relative;
        .err-tip {
            padding: 0 10px;
            position: absolute;
            top: 50%;
            margin-top: -60px;
            font-size: 12PX;
            i {
                font-size: 80px;
                display: block;
                text-align: center;
            }
        }
        .comp-div {
            cursor: pointer;
            position: relative;
            padding: 10px 5px;
            &.click {
                background-color: #f9f9f9;
            }
            i.fa-times-circle {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 20px;
                z-index: 1;
                color: rgba(115, 105, 105, 0.5);
            }
            .contract-trigger:before,
            .resize-triggers,
            .resize-triggers > div {
                content: none;
            }
            .el-checkbox__original {
                position: static;
            }
            .el-checkbox__inner {
                z-index: 0;
            }
            .el-form-item {
                margin-bottom: 0;
            }
            .el-checkbox+.el-checkbox,
            .el-radio+.el-radio {
                margin-left: 20px;
            }
        }
    }
}
.sortable-ghost {
    position: relative;
    z-index: 1;
    &::after {
        content: '将组件放在这里';
        text-align: center;
        width: 100%;
        height: 100%;
        font-size: 14px;
        position: absolute;
        top: 0;
        left: 0;
        color: #f00;
        background-color: #fbece2;
        border: 1px dashed #f60;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
    }
}
</style>
