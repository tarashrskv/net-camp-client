<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1 class="text--secondary mb-3">
                    My Scores
                </h1>
                <v-card :key="score.id" v-for="score in sortedScores">
                    <v-card-title>
                        <h1 class="text--primary">{{score.user.login}}</h1>
                    </v-card-title>
                    <v-card-text>
                        <h3>{{score.score}}</h3>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import store from "@/store/index.js"
import axios from "axios";

export default {
  data() {
    return {
      scores: []
    };
  },
  computed: {
      sortedScores: function() {
          return this.scores.sort((a, b) => b.score - a.score);
      }
  },
  created() {
    axios({
      url: `https://localhost:44363/api/Result/?userId=${store.getters.user.id}&gameId=${this.$route.params.id}`,
      method: "GET"
    })
      .then(resp => (this.scores = resp.data))
      .catch(err => console.eroor(err));
  }
};
</script>