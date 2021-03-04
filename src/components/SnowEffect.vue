<template>
	<div class="container">
		<h3>Snow Effect (Merry Christmas~)</h3>
		<p style="z-index:999;pointer-events: all;"><button @click="setImage('snow')">Snow</button>
			<button @click="setImage('snowman')">Snow Man</button>
			<button @click="setImage('santaclaus')">Santa Claus</button>
			<button @click="setImage('hat')">Santa Hat</button>
			<button @click="setImage('gift')">Gift</button>
			<button @click="setImage('tree')">Tree</button>
		</p>

		<div class="body">
			<snowing
			v-bind="snowConf"
			:images="images"
			:show="showSnow"
			></snowing>
		</div>
			
	</div>
</template>

<script>
	export default {
		data: () => ({
			snowConf: {
				windPower : 0.5,  
				speed : 3,
				count : 20,
				size : 12,
				opacity : 1,
			},
			images: ['https://image.flaticon.com/icons/png/128/642/642000.png',
			'https://image.flaticon.com/icons/png/128/3737/3737206.png',
			'https://image.flaticon.com/icons/png/128/892/892845.png'],
			type: 'all',
			showSnow: false,   
		}),
		components: {
			'snowing': require('./Snowing').default
		},
		methods:{
			setImage(type){
				this.showSnow = false

				if (type == "snowman") {
					this.type = 'snowman'
					this.images = ['https://image.flaticon.com/icons/png/128/1153/1153009.png']
				}
				else if (type == "santaclaus") {
					this.type = 'santaclaus'
					this.images = ['https://image.flaticon.com/icons/png/128/3737/3737908.png']
				}
				else if (type == "tree") {
					this.type = 'tree'
					this.images = ['https://image.flaticon.com/icons/png/128/892/892845.png']
				}
				else if (type == "hat") {
					this.type = 'hat'
					this.images = ['https://image.flaticon.com/icons/png/128/892/892856.png']
				}
				else if (type == "gift") {
					this.type = 'gift'
					this.images = ['https://image.flaticon.com/icons/png/128/1139/1139982.png']
				}
				else{
					this.type = 'snow'
					this.images = ['https://image.flaticon.com/icons/png/128/642/642000.png']
				}
				this.showSnow = true

			},
		},
		mounted () {
			this.setImage('snow')
		}  
	}
</script>