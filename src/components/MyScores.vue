<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">
                    My Scores
                </h1>
                <v-card class="elevation-9 mb-3"  :key="score.id" v-for="score in sortedScores">
                    <v-layout row>
                      <v-flex xs1>
                        <v-card-text>
                          <h1 class="text--primary">
                            {{sortedScores.indexOf(score) + 1}}
                          </h1>
                        </v-card-text>
                      </v-flex>
                    <v-flex xs3>
                            <v-card-media
                            :src="score.userAvatarUrl"
                            height="125px">
                            </v-card-media>
                    </v-flex>
                    <v-flex xs4>
                    <v-card-title>
                        <h1 class="text--primary">{{score.userLogin}}</h1>
                    </v-card-title>
                    </v-flex>
                    <v-flex xs4>
                    <v-card-text>
                        <h1 class="text--primary">{{score.score}}</h1>
                    </v-card-text>
                    </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import store from "@/store/index.js";
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
      url: `https://localhost:44363/api/Results/?userId=${
        store.getters.user.id
      }&gameId=${this.$route.params.id}`,
      method: "GET"
    })
      .then(resp => (this.scores = resp.data))
      .catch(err => console.eroor(err));
  }
};
</script>