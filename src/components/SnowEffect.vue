<template>
  <div class="bg-dark">
    <h3 style="color: #fff">Snow effect (Merry Christmas~)</h3>
    <div>
      <b-button variant="outline-primary" @click="setImage('snow')"
        >Snow</b-button
      >
      <b-button variant="outline-secondary" @click="setImage('snowman')"
        >Snow Man</b-button
      >
      <b-button variant="outline-success" @click="setImage('tree')"
        >Tree</b-button
      >
      <b-button variant="outline-info" @click="setImage('santaclaus')"
        >Santa Claus</b-button
      >
      <b-button variant="outline-danger" @click="setImage('hat')"
        >Santa Hat</b-button
      >
      <b-button variant="outline-warning" @click="setImage('gift')"
        >Gift</b-button
      >
    </div>

    <div>
      <snowing v-bind="snowConf" :images="images" :show="showSnow"></snowing>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    snowConf: {
      windPower: 0.5,
      speed: 3,
      count: 20,
      size: 12,
      opacity: 1,
    },
    images: [
		require("../assets/snowflake.png"),
		require("../assets/snowman.png"),
		require("../assets/tree.png")
    ],
    type: "all",
    showSnow: false,
  }),
  components: {
    snowing: require("./Snowing").default,
  },
  methods: {
    setImage(type) {
      this.showSnow = false; var image_path = require("../assets/snowflake.png");

      if (type == "snowman") {
        this.type = "snowman";
		image_path = require("../assets/snowman.png");
      } else if (type == "santaclaus") {
        this.type = "santaclaus";
		image_path = require("../assets/santaclaus.png");
      } else if (type == "tree") {
        this.type = "tree";
		image_path = require("../assets/tree.png");
      } else if (type == "hat") {
        this.type = "hat";
		image_path = require("../assets/hat.png");
      } else if (type == "gift") {
        this.type = "gift";
		image_path = require("../assets/gift.png");
      } else {
        this.type = "snow";
      }this.images = [ image_path ];
      this.showSnow = true;
    },
  },
  mounted() {
    this.setImage("snow");
  },
};
</script>
