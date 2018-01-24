<template>
<div id="app">
	<router-view/>
</div>
</template>

<script>
export default {
	name: 'app',
    data() {
        return {

        }
    }
}
</script>

<style>
html,
body{
	margin: 0;
	border: 0;
	height: 100%;
	width: 100%;
}

#app {
	height: 100%;
	width: 100%;
}
</style>
