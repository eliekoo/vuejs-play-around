<template>
	<div class="container">
		<h3>Rain effect</h3>

		<div class="body">
			<div :class="{'light-toggle': light_toggle, 'heavy-toggle': heavy_toggle, 'single-toggle': single_toggle}">
				<div class="rain front-row" v-html="raindrops"></div>
			</div>
			<div class="rain back-row" v-html="backraindrops"></div>
			<div class="toggles">
				<div class="light-toggle toggle" :class="{'active': light_toggle }" @click="light_toggle = !light_toggle" >SPLAT</div>
				<div class="heavy-toggle toggle" :class="{'active': heavy_toggle }" @click="heavy_toggle = !heavy_toggle" >HEAVY</div>
				<div class="single-toggle toggle" :class="{'active': single_toggle }" @click="single_toggle = !single_toggle" >SINGLE</div>
			</div>
		</div>

	</div>
</template>

<style>
.body {
	height: 600px;
	margin: 0;
	overflow: hidden;
	background: linear-gradient(to bottom, #2F4F4F, #2F4F4F);
}

.rain {
	position: absolute;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
}

.rain.back-row {
	display: none;
	z-index: 1;
	bottom: 60px;
	opacity: 0.5;
}

.body.back-row-toggle .rain.back-row {
	display: block;
}

.drop {
	position: absolute;
	bottom: 100%;
	width: 15px;
	height: 120px;
	pointer-events: none;
	animation: drop 0.5s linear infinite;
}

@keyframes drop {
	0% {
		transform: translateY(0vh);
	}
	75% {
		transform: translateY(90vh);
	}
	100% {
		transform: translateY(90vh);
	}
}

.stem {
	width: 1px;
	height: 60%;
	margin-left: 7px;
	background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
	animation: stem 0.5s linear infinite;
}

@keyframes stem {
	0% {
		opacity: 1;
	}
	65% {
		opacity: 1;
	}
	75% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}

.light {
	width: 15px;
	height: 10px;
	border-top: 2px dotted rgba(255, 255, 255, 0.5);
	border-radius: 50%;
	opacity: 1;
	transform: scale(0);
	animation: light 0.5s linear infinite;
	display: none;
}

.body.light-toggle .light {
	display: block;
}

@keyframes light {
	0% {
		opacity: 1;
		transform: scale(0);
	}
	80% {
		opacity: 1;
		transform: scale(0);
	}
	90% {
		opacity: 0.5;
		transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(1.5);
	}
}

.toggles {
	position: absolute;
	z-index: 3;
}

.toggle {
	position: absolute;
	left: 20px;
	width: 50px;
	height: 50px;
	line-height: 51px;
	box-sizing: border-box;
	text-align: center;
	font-family: sans-serif;
	font-size: 10px;
	font-weight: bold;
	background-color: rgba(255, 255, 255, 0.2);
	color: rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 0.3s;
}

.toggle:hover {
	background-color: rgba(255, 255, 255, 0.25);
}

.toggle:active {
	background-color: rgba(255, 255, 255, 0.3);
}

.toggle.active {
	background-color: rgba(255, 255, 255, 0.4);
}

.light-toggle {
	top: 25px;
}

.heavy-toggle {
	top: 95px;
}

.single-toggle {
	top: 160px;
}

.single-toggle .drop {
	display: none;
}

.single-toggle .drop:nth-child(10) {
	display: block;
}
</style>

<script>
	export default {
		data: () => ({
			raindrops: "",
			backraindrops: "",
			light_toggle: false,
			heavy_toggle: false,
			single_toggle: false,
			increment: 0,
		}),
		methods: {

			makeItRain: function() {

				while (this.increment < 100) {
					var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
					var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
					this.increment += randoFiver;

					this.raindrops += '<div class="drop" style="left: ' + this.increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="light" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
					this.backraindrops += '<div class="drop" style="right: ' + this.increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="light" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
				}

			}


		},
		created() {
			this.makeItRain();
		}
	};

</script>