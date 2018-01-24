<template>
<div class="phone">
	<div class="left-time">
		{{time}}
	</div>
	<div class="header_hair">
		<div class="header_voice"></div>
	</div>
	<div class="right-icon">
		<i class="fa fa-signal"></i>
		<i class="fa fa-wifi"></i>
		<i class="fa fa-battery-1"></i>
	</div>
	<div class="foot-gang"></div>
	<div class="phone-container">
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	name: 'phone',
	data() {
		return {
			time: ''
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
		}
	}
}
</script>

<style lang="less">
.phone {
    background-color: #fff;
    height: 580px;
    width: 280px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -300px;
    border-radius: 40px;
    border: 10px solid #000;
    .right-icon {
        position: absolute;
        color: #000;
        right: 7px;
        top: 9px;
        font-size: 12px;
    }
    .left-time {
        position: absolute;
        color: #000;
        left: 13px;
        top: 9px;
        font-size: 14px;
    }
    .header_hair {
        width: 170px;
        height: 18px;
        background-color: #000;
        margin: auto;
        border-radius: 0 0 20px 20px;
        padding-top: 7px;
        .header_voice {
            height: 5px;
            background: #545252;
            width: 50px;
            margin: auto;
            border-radius: 10px;
        }
    }
    .foot-gang {
        width: 100px;
        height: 4px;
        border-radius: 5px;
        background-color: #000;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -50px;
    }
    .phone-container {
        height: ~"calc(100% - 50px)";
        padding: 3px;
		& > div {
			height: 100%;
		}
		overflow-y: auto;
    }
}
</style>
