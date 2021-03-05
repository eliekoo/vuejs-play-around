<template>
	<div class="bg-dark">
		<h3 style="color: #fff">Snow effect (Merry Christmas~)</h3>
		<div>
      <b-button variant="outline-primary" @click="setImage('snow')">Snow</b-button>
      <b-button variant="outline-secondary" @click="setImage('snowman')">Snow Man</b-button>
      <b-button variant="outline-success" @click="setImage('tree')">Tree</b-button>
      <b-button variant="outline-info" @click="setImage('santaclaus')">Santa Claus</b-button>
      <b-button variant="outline-danger"  @click="setImage('hat')">Santa Hat</b-button>
      <b-button variant="outline-warning" @click="setImage('gift')">Gift</b-button>
    </div>

		<div>
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
