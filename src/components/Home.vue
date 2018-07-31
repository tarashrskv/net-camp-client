<template>
<div>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-carousel>
    <v-carousel-item
      v-for="game in ads"
      :key="game.id"
      :src="game.imageSrc"
    >
    
        </v-carousel-item>
  </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="game in ads" :key="game.id">
                <v-card>
        <v-card-media
          :src="game.imageSrc"
          height="200px"
        ></v-card-media>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{game.title}}</h3>
            <div>{{game.description}}</div>
          </div>
        </v-card-title>
      </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      ads: [
        {
          title: "Grand Theft Auto VI",
          description:
            "...You are what hipsters aspire to be. You, Trevor, are the proto-hipster",
          imageSrc: `https://ps4n.ru/wp-content/uploads/2017/07/GTA-6.jpg`,
          id: "1"
        },
        {
          title: "Portal 3",
          description: "The cake is a lie",
          imageSrc: `http://paperlief.com/images/portal-3-trailer-wallpaper-4.jpg`,
          id: "2"
        },
        {
          title: "Fallout 5",
          description: "Ring-a-ding-ding baby! I got your back",
          imageSrc: `https://news4c.com/wp-content/uploads/2018/03/Fallout-5.jpeg`,
          id: "3"
        }
      ]
    };
  }
};
</script>

<style scoped>
.carousel-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
