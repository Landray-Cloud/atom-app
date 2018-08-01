<template>
<div>
  <component :is="comp" :obj="obj"></component>
</div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      comp: '',
      obj: {
        url: 'sdsdasd'
      }
    }
  },
  mounted() {
    requirejs(['./static/task.js'], r => {
      console.log(r)
      this.comp = r.default
    })
  },
  methods: {

  }
}
</script>

<style lang="less">
</style>
