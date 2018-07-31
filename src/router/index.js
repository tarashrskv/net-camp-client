import Vue from "vue";
import guard from "./guard";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Game from "@/components/Game.vue";
import Login from "@/components/Login.vue";
import About from "@/components/About.vue";
import Registration from "@/components/Registration.vue";
import GamesList from "@/components/GamesList.vue";

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
      component: Game,
      beforeEnter: guard
    }
  ],
  mode: "history"
});
