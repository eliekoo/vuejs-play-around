<template>

	<div id="app">
    <div id="app">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="Animation" right>
              <b-dropdown-item href="/snow">Snow</b-dropdown-item>
              <b-dropdown-item href="/rain">Rain</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <section>
      <router-view></router-view>
    </section>
    <!-- <section>
      <slot name="sidebar"></slot>
    </section> -->
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
}
.dropdown-menu {
  background-color: grey !important; 
}
</style>
