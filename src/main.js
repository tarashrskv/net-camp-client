import Vue from "vue";
import App from "./App";
import axios from "axios";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserPlus,
  faQuestionCircle,
  faSignInAlt,
  faSignOutAlt,
  faGamepad,
  faTrophy,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUserPlus,
  faQuestionCircle,
  faSignInAlt,
  faSignOutAlt,
  faGamepad,
  faTrophy,
  faUsers
);

Vue.component("fa", FontAwesomeIcon);

Vue.use(Vuetify, {
  theme: {
    primary: "#1976D2",
    secondary: "#9E9E9E",
    accent: "#009688",
    error: "#C51162",
    warning: "#FFCA28",
    info: "#42A5F5",
    success: "#4CAF50"
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.$store.dispatch("keepUserLoggedIn", token);
    }
  }
});
