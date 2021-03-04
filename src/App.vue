<template>

	<div id="app">
		<header class="page-frame__header">
			<h1>Vuejs-animation-effect</h1>
			<div class="nav-topbar">
				<div class="nav-topbar__list">
					<div class="nav-topbar__item">

						<p><router-link to="/snow"> Go to snow </router-link></p>
						<p><router-link to="/rain"> Go to rain </router-link></p>
						<p><router-link to="/test" class="button blue btn-large"> test </router-link></p>

					</div>
				</div>
			</div>
		</header>

		<div>
              <section>
                <router-view></router-view>
              </section>
              <!-- <section>
                <slot name="sidebar"></slot>
              </section> -->
            </div>
		
	</div>

</template>

<script>
	export default {
		computed: {
			username() {
				return this.$route.params.username
			}
		},
		methods: {
			goBack() {
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
			}
		}
	}
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
