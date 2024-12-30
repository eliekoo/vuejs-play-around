<template>
  <div class="background bg-dark">
    <h3 style="color: #fff">Moving button</h3>
    <h1 style="color: #ff6688">Do you love me?</h1>

    <div class="background">
      <button class="button yes-button" @click="sayYes">Yes</button>
      <button
        class="button no-button"
        :style="noButtonStyle"
        @mouseover="moveNoButton"
        @click="sayNo"
      >
        No
      </button>
    </div>
    <div class="background hover-count" style="color: #fff">
      You tried to say No: {{ hoverCount }} times
      <br />
      <div v-if="hoverCount > 100" class="sad-emoji">😭</div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-color: #343a40;
  height: 100%;
  margin: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}
.button {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s, font-size 0.2s, border-color 0.2s;
  z-index: 99;
}
.yes-button {
  border-color: #4caf50;
  color: #4caf50;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.no-button {
  border-color: #f44336;
  color: #f44336;
  position: absolute;
}
.hover-count {
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
}
.sad-emoji {
  font-size: 50px;
  margin-top: 20px;
  color: #f44336;
}
</style>
<script>
export default {
  data: () => ({
    noButtonPosition: { top: 50, left: 50 },
    hoverCount: 0,
  }),
  computed: {
    noButtonStyle() {
      let fontSize = "16px";
      let padding = "10px 20px";

      if (this.hoverCount > 50) {
        fontSize = "100px";
        padding = "25px 35px";
      } else if (this.hoverCount > 30) {
        fontSize = "50px";
        padding = "22px 32px";
      } else if (this.hoverCount > 20) {
        fontSize = "30px";
        padding = "20px 30px";
      } else if (this.hoverCount > 10) {
        fontSize = "20px";
        padding = "15px 25px";
      }

      return {
        top: this.noButtonPosition.top + "%",
        left: this.noButtonPosition.left + "%",
        fontSize: fontSize,
        padding: padding,
      };
    },
  },
  methods: {
    sayYes() {
      alert("I love you too! ❤️");
      this.hoverCount = 0;
    },
    sayNo() {
      alert("Oh no! 😢");
    },
    moveNoButton() {
      this.hoverCount++;
      this.noButtonPosition.top = Math.random() * 70 + 10;
      this.noButtonPosition.left = Math.random() * 70 + 10;
    },
  },
};
</script>
