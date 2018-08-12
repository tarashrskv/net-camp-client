<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">
                    Games
                </h1>
                <v-card class="elevation-9 mb-4"
                v-for="game in games"
                :key="game.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-card-media
                            :src="game.imageSrc"
                            height="155px">
                            </v-card-media>
                        </v-flex>
                        <v-flex xs8>
                           <v-card-text>
                               <h2 class="text--primary">{{game.title}}</h2>
                               <p>{{game.about}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="info" :to="'/games/' + game.id">Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      games: []
    };
  },
  created() {
    axios({ url: `https://localhost:44363/api/Games`, method: "GET" })
      .then(resp => (this.games = resp.data))
      .catch(err => console.error(err));
  }
};
</script>
