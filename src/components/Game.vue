<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-media :src="game.imageSrc" height="550px"></v-card-media>
                    <v-card-text>
                        <h1 class="text--primary">{{game.title}}</h1>
                        <p>{{game.about}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat class="accent">All scores</v-btn>
                        <v-btn class="success">My scores</v-btn>
                    </v-card-actions>
                </v-card>
                <div id="game"></div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      game: {}
    };
  },
  created() {
    axios({
      url: `https://localhost:44363/api/Game/${this.$route.params.id}`,
      method: "GET"
    })
      .then(resp => this.game = resp.data)
      .catch(err => console.error(err));
  }
};
</script>
