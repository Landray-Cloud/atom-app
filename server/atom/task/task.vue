<template>

  <component :is="List" :param="param" :list="main"></component>

</template>

<script>

  import List from './comps/list'

export default {
	name: 'task',
  components: {


        List


  },
	data() {
		 main: {},
     domain: '',
     param: {},
     paramStr: '{&quot;data&quot;:&quot;fdName&quot;}'
	},
  props: ['obj'],
  mounted() {
    if (this.obj && this.obj.url) {
      this.param = JSON.parse(this.paramStr.replace(/&quot;/g, '"'))
      this.domain = this.obj.url.substring(0, this.obj.url.indexOf('km'))
      this.load()
    }
  },
  methods: {
    load() {
      let url = this.obj.url
      this.$http.get(url, {
        withCredentials: true
      }).then(res => {
        if (res.data) {
          if(res.data.datas)
            this.main = this.formatList(res.data.datas)
          else
            this.main = arr
        }
        let status = 0,
          fail = ''
        if (res.data && typeof res.data === 'string' && res.data.indexOf('</html>') > -1) {
          status = 302
          fail = '请先登录ekp/kk'
        } else
          status = res.status
        this.$emit('callback', {
          data: this.main,
          status: status,
          comp: 'task',
          succ: '',
          fail: fail || '。'
        })
      }, error => {
        let fail = '查询失败'
        if (error.response.status === 403)
          fail = '你无权限查询该功能'
        this.$emit('callback', {
          status: 500,
          comp: 'task',
          fail: fail
        })
      })
    },
    formatList(data) {
      let arr = []
      for (let i = 0; i < data.datas.length; i++) {
        let obj = {}
        for (let k = 0; k < data.columns.length; k++)
          for (let j = 0; j < data.datas[i].length; j++)
            if (data.columns[k].property == data.datas[i][j].col) {
              obj[data.columns[k].property] = data.datas[i][j].value
              break
            }
        arr.push(obj)
      }
      return arr
    }
  }
}
</script>

<style lang="less">
</style>
