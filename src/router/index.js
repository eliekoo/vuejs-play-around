import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: require("./../components/SnowEffect.vue").default,
  },
  {
    path: "/rain",
    name: "rain",
    component: require("./../components/RainEffect.vue").default,
  },
  {
    path: "/snow",
    name: "snow",
    component: require("./../components/SnowEffect.vue").default,
  },
  {
    path: "/firework",
    name: "firework",
    component: require("./../components/FireworkEffect.vue").default,
  },
  {
    path: "/moving-button",
    name: "MovingButton",
    component: require("./../components/MovingButton.vue").default,
  },
  {
    path: "/test",
    name: "test",
    component: require("./../components/HelloWorld.vue").default,
  },
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
// const app = new Vue({
//   router
// }).$mount('#app')

export default router;
