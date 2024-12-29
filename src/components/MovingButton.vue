<template>
  <div class="bg-dark">
    <div class="background canvasBox">
      <h3 style="color: #fff">Do you love me?</h3>
      <button class="button yes-button" @click="sayYes">Yes</button>
      <button
        class="button no-button"
        :style="noButtonStyle"
        @mouseover="moveNoButton"
      >
        No
      </button>
    </div>
  </div>
</template>

<style scoped>
.button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}
.yes-button {
  background-color: #4caf50;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.no-button {
  background-color: #f44336;
  color: white;
  position: absolute;
}
</style>
<script>
export default {
  data: () => ({
    noButtonPosition: { top: 50, left: 50 },
  }),
  computed: {
    noButtonStyle() {
      return {
        top: this.noButtonPosition.top + "%",
        left: this.noButtonPosition.left + "%",
      };
    },
  },
  methods: {
    sayYes() {
      alert("I love you too! ❤️");
    },
    moveNoButton() {
      this.noButtonPosition.top = Math.random() * 80 + 10;
      this.noButtonPosition.left = Math.random() * 80 + 10;
    },
  },
};
</script>
