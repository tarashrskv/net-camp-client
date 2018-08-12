<template>
    <div id="game">
        <v-btn @click="startGame" class="info">Start game</v-btn>
        <v-btn @click="restartGame" class="warning">Restart game</v-btn>
        <v-btn @click="closeGame" class="error">Close Game</v-btn>
    </div>
</template>

<script>
import game1 from "../games/game1.js";
import game2 from "../games/game2.js";

export default {
  data() {
    return {
      game: null
    };
  },
  created() {
    this.game = this.getGame();
  },
  methods: {
    getGame() {
      switch (this.$route.params.id) {
        case "1":
          return game1;
          break;
        case "2":
          return game2;
          break;
      }
    },
    startGame() {
      this.game.startGame();
    },
    restartGame() {
      this.game.restartGame();
    },
    closeGame() {
      this.game.closeGame();
    }
  }
};
</script>

