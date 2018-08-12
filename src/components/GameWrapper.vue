<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-media :src="gameEntity.imageSrc" height="450px"></v-card-media>
                    <v-card-title>
                        <h1 class="text--primary">{{gameEntity.title}}</h1>
                    </v-card-title>
                    <v-card-text>
                        <h3>{{gameEntity.about}}</h3>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat class="accent" :to="'/games/' + gameId() + '/allScores'">All scores</v-btn>
                        <v-btn flat class="success" :to="'/games/' + gameId() + '/myScores'">My scores</v-btn>
                        <v-btn v-if="this.$store.getters.isUserAdmin" flat class="secondary" :to="'/games/' + gameId() + '/rating'"><fa pull="left" icon="trophy"/>Rating</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <game/>
    </v-container>
</template>

<script>
import Game from "@/components/Game.vue";
import axios from "axios";

export default {
  data() {
    return {
      gameEntity: {}
    };
  },
  components: {
    game: Game
  },
  created() {
    axios({
      url: `https://localhost:44363/api/Games/${this.gameId()}`,
      method: "GET"
    })
      .then(resp => (this.gameEntity = resp.data))
      .catch(err => console.error(err));
  },
  methods: {
    gameId() {
      return this.$route.params.id;
    }
  }
};
</script>
