<template>
<container>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>应用列表</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="atom-app-list">
		<div class="atom-app-one" @click="edit()">
			<div class="cell add">
				<i class="el-icon-plus"></i>
			</div>
		</div>
		<div class="atom-app-one">
			<div class="cell">
				原子应用
			</div>
			<div class="btn">
				<i title="编辑" @click="edit()" class="el-icon-edit"></i>
				<i title="删除" @click="del()" class="el-icon-delete"></i>
				<i title="编译" @click="com()" class="el-icon-printer"></i>
			</div>
		</div>
	</div>
</container>
</template>


<script>
import Container from '@/components/container';
export default {
	name: 'index',
	components: {
		Container
	},
	data() {
		return {

		}
	},
	methods: {
		load() {

		},
		com() {

		},
		edit(id) {
			let obj = {
				name: 'Edit'
			}
			if (id) {
				obj.query = {
					id: id
				}
			}
			this.$router.push(obj)
		},
		del(id) {
			this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {

			})
		}
	}
}
</script>

<style lang="less">
.atom-app-list {
    position: relative;
    padding: 20px 20px 0 0;
    width: 100%;
    height: ~"calc(100% - 34px)";
    .el-pagination {
        position: absolute;
        bottom: 20px;
        left: 50%;
    }
    &::after {
        content: '';
        clear: both;
    }
    .atom-app-one {
        cursor: pointer;
        float: left;
        width: 200px;
        height: 150px;
        background-color: #128355;
        font-size: 16px;
        text-align: center;
        color: #fff;
        border-radius: 3px;
        box-shadow: 3px 3px #0a210e;
        display: table;
        position: relative;
        margin-right: 20px;
        &:hover {
            background-color: #115b60;
        }
        .cell {
            display: table-cell;
            vertical-align: middle;
            &.add {
                font-size: 30px;
            }
        }
        .btn {
            position: absolute;
            bottom: 5px;
            right: 10px;
            font-size: 18px;
            i {
                cursor: pointer;
                margin-left: 10px;
                &:hover {
                    color: #dda72e;
                }
            }
        }
    }
}
</style>
