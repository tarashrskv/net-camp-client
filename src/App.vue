<template>
  <v-app>
  <v-navigation-drawer app temporary v-model="drawer">
    <v-list>
          <v-list-tile
          v-for="link of links"
          :key="link.title"
          :to="link.url"
           >
            <v-list-tile-action>
              <fa v-bind:icon="link.icon"/>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
          v-if="isUserAuthenticated"
          @click="onLogout"
           >
            <v-list-tile-action>
              <fa pull="left" icon="sign-out-alt"/>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
  </v-navigation-drawer>
  <v-toolbar app dark color="primary">
    <v-toolbar-side-icon  @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-title><router-link to="/" tag="span" class="pointer">.NET Camp</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
      v-for="link of links"
      :key="link.title"
      :to="link.url"
      flat><fa pull="left" v-bind:icon="link.icon"/>{{link.title}}</v-btn>
      <v-btn
      v-if="isUserAuthenticated"
      @click="onLogout"
      flat><fa pull="left" icon="sign-out-alt"/>Logout</v-btn>
      
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
      <router-view></router-view>
  </v-content>
  <template v-if="error">
  <v-snackbar
      @input="closeError"
      value="true"
      color="error"
      :multi-line="true"
      :timeout="5000"
    >
      {{error}}
      <v-btn
        color="info"
        flat
        @click="closeError"
      >
        Close
      </v-btn>
    </v-snackbar>
    </template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>Taras Hreskiv | Eleks .NET Camp &copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
    links() {
      if (this.isUserAuthenticated) {
        return [
          { title: "About", icon: "question-circle", url: "/about" },
          { title: "Games", icon: "gamepad", url: "/games" }
        ];
      } else
        return [
          { title: "Login", icon: "sign-in-alt", url: "/login" },
          { title: "Registration", icon: "user-plus", url: "/registration" },
          { title: "About", icon: "question-circle", url: "/about" }
        ];
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
