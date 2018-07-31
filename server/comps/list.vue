<template>
  <div>
    <div v-for="l in list">{{l[param.data]}}</div>
  </div>
</template>

<script>
export default {
    name: 'list',
    props: ['param', 'list']
}
</script>

<style lang="less">
</style>
