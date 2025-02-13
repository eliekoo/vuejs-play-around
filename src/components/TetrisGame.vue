<template>
  <div class="tetris-container">
    <h1>Tetris Game (Vue 2)</h1>
    <canvas ref="canvas" width="300" height="600"></canvas>
    <div class="info-panel">
      <p>Score: {{ score }}</p>
      <button @click="togglePause">{{ isPaused ? "Resume" : "Pause" }}</button>
      <button @click="resetGame">Restart</button>
    </div>
    <div class="controls">
      <button @click="movePiece(-1)">⬅</button>
      <button @click="rotatePiece()">⬆</button>
      <button @click="movePiece(1)">➡</button>
      <button @click="dropPiece()">⬇</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      board: Array(20)
        .fill()
        .map(() => Array(10).fill(0)),
      currentPiece: null,
      score: 0,
      isPaused: false,
      gameInterval: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error("Canvas not found!");
        return;
      }
      this.ctx = canvas.getContext("2d");
      document.addEventListener("keydown", this.handleKeydown);
      this.startGame();
    });
  },
  methods: {
    getRandomPiece() {
      const pieces = [
        [[1, 1, 1, 1]], // I
        [
          [1, 1],
          [1, 1],
        ], // O
        [
          [0, 1, 1],
          [1, 1, 0],
        ], // S
        [
          [1, 1, 0],
          [0, 1, 1],
        ], // Z
        [
          [1, 0, 0],
          [1, 1, 1],
        ], // L
        [
          [0, 0, 1],
          [1, 1, 1],
        ], // J
        [
          [0, 1, 0],
          [1, 1, 1],
        ], // T
      ];
      return {
        shape: pieces[Math.floor(Math.random() * pieces.length)],
        x: 3,
        y: 0,
      };
    },
    startGame() {
      this.resetGame();
      this.gameInterval = setInterval(this.dropPiece, 500);
    },
    resetGame() {
      this.board = Array(20)
        .fill()
        .map(() => Array(10).fill(0));
      this.score = 0;
      this.isPaused = false;
      this.currentPiece = this.getRandomPiece();
      this.drawBoard();
    },
    drawBoard() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, 300, 600);
      this.board.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            this.ctx.fillStyle = "#FF0D72";
            this.ctx.fillRect(x * 30, y * 30, 30, 30);
            this.ctx.strokeStyle = "#000";
            this.ctx.strokeRect(x * 30, y * 30, 30, 30);
          }
        });
      });
      this.drawPiece();
    },
    drawPiece() {
      if (!this.ctx || !this.currentPiece) return;
      this.ctx.fillStyle = "#0DFF72";
      this.currentPiece.shape.forEach((row, dy) => {
        row.forEach((cell, dx) => {
          if (cell) {
            this.ctx.fillRect(
              (this.currentPiece.x + dx) * 30,
              (this.currentPiece.y + dy) * 30,
              30,
              30
            );
            this.ctx.strokeStyle = "#000";
            this.ctx.strokeRect(
              (this.currentPiece.x + dx) * 30,
              (this.currentPiece.y + dy) * 30,
              30,
              30
            );
          }
        });
      });
    },
    dropPiece() {
      if (this.isPaused) return;
      if (this.canMove(0, 1)) {
        this.currentPiece.y++;
      } else {
        if (this.currentPiece.y === 0) {
          alert("Game Over!");
          this.resetGame();
          return;
        }
        this.mergePiece();
        this.currentPiece = this.getRandomPiece();
      }
      this.drawBoard();
    },
    movePiece(dir) {
      if (this.canMove(dir, 0)) {
        this.currentPiece.x += dir;
        this.drawBoard();
      }
    },
    rotatePiece() {
      const rotated = this.currentPiece.shape[0].map((_, i) =>
        this.currentPiece.shape.map((row) => row[i]).reverse()
      );
      const oldShape = this.currentPiece.shape;
      this.currentPiece.shape = rotated;
      if (!this.canMove(0, 0)) this.currentPiece.shape = oldShape;
      this.drawBoard();
    },
    canMove(dx, dy) {
      return this.currentPiece.shape.every((row, y) =>
        row.every(
          (cell, x) =>
            !cell ||
            (this.isInsideBoard(
              this.currentPiece.x + x + dx,
              this.currentPiece.y + y + dy
            ) &&
              !this.board[this.currentPiece.y + y + dy]?.[
                this.currentPiece.x + x + dx
              ])
        )
      );
    },
    isInsideBoard(x, y) {
      return x >= 0 && x < 10 && y >= 0 && y < 20;
    },
    mergePiece() {
      this.currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            this.board[this.currentPiece.y + y][this.currentPiece.x + x] = 1;
          }
        });
      });
      this.clearLines();
    },
    clearLines() {
      this.board = this.board.filter((row) => row.some((cell) => !cell));
      while (this.board.length < 20) {
        this.board.unshift(Array(10).fill(0));
      }
      this.score += 10;
    },
    togglePause() {
      this.isPaused = !this.isPaused;
    },
    handleKeydown(event) {
      if (this.isPaused) return;
      if (event.key === "ArrowLeft") this.movePiece(-1);
      if (event.key === "ArrowRight") this.movePiece(1);
      if (event.key === "ArrowDown") this.dropPiece();
      if (event.key === "ArrowUp") this.rotatePiece();
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
    clearInterval(this.gameInterval);
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.controls button {
  padding: 10px;
  font-size: 20px;
}
</style>

<style scoped>
.tetris-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282c34;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
canvas {
  border: 2px solid white;
  background-color: black;
}
.info-panel {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
button {
  padding: 10px;
  border: none;
  background: #ff4081;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #e91e63;
}
</style>
