import Vue from "vue";
import guard from "./guard";
import adminsOnly from "./adminsOnly"
import Router from "vue-router";
import Home from "@/components/Home.vue";
import MyScores from "@/components/MyScores.vue";
import GameWrapper from "@/components/GameWrapper.vue";
import Login from "@/components/Login.vue";
import About from "@/components/About.vue";
import AllScores from "@/components/AllScores.vue";
import Registration from "@/components/Registration.vue";
import GamesList from "@/components/GamesList.vue";
import Rating from "@/components/Rating.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/games",
      name: "games",
      component: GamesList,
      beforeEnter: guard
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/games/:id",
      name: "game",
      component: GameWrapper,
      beforeEnter: guard
    },
    {
      path: "/games/:id/allScores",
      name: "allScores",
      component: AllScores,
      beforeEnter: guard
    },
    {
      path: "/games/:id/myScores",
      name: "myScores",
      component: MyScores,
      beforeEnter: guard
    },
    {
      path: "/games/:id/rating",
      name: "rating",
      component: Rating,
      beforeEnter: adminsOnly
    }
  ],
  mode: "history"
});
