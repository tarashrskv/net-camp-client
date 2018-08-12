<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">
                    Rating
                </h1>
                <v-card class="elevation-9 mb-3"  :key="rating.item1.id" v-for="rating in ratings">
                    <v-layout row>
                        <v-flex xs1>
                            <v-card-text><h1 class="text--primary">
                                {{ratings.indexOf(rating) + 1}}
                            </h1></v-card-text>
                        </v-flex>
                    <v-flex xs3>
                            <v-card-media
                            :src="rating.item1.avatarUrl"
                            height="125px"
                            >
                            </v-card-media>
                    </v-flex>
                    <v-flex xs4>
                    <v-card-title>
                        <h1 class="text--primary">{{rating.item1.login}}</h1>
                    </v-card-title>
                    </v-flex>
                    <v-flex xs4>
                    <v-card-text>
                        <h1 class="text--primary">{{rating.item2.toFixed(3)}}</h1>
                    </v-card-text>
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
      ratings: []
    };
  },
  computed: {
    sortedRatings: function() {
      return this.ratings.sort((a, b) => b.item2 - a.item2);
    }
  },
  created() {
    axios({
      url: `https://localhost:44363/api/Games/${this.gameId()}/rating`,
      method: "GET"
    })
      .then(resp => (this.ratings = resp.data))
      .catch(err => console.error(err));
  },
  methods: {
    gameId() {
      return this.$route.params.id;
    }
  }
};
</script>