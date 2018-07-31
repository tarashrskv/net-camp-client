<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title> 
              </v-toolbar>
              <v-card-text>
                <v-form
                v-model="valid"
                ref="form"
                lazy-validation>
                  <v-text-field
                  v-model.trim="login"
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  :counter="20"
                  :rules="loginRules">
                  </v-text-field>
                  <v-text-field
                   v-model="password"
                   id="password"
                   prepend-icon="lock"
                   name="password"
                   label="Password"
                   type="password"
                   :rules="passwordRules">
                   </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary" :loading="loading" :disabled="!valid || loading">Login</v-btn>
              </v-card-actions>
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
      login: "",
      password: "",
      valid: false,
      loginRules: [
        v => !!v || "Login is required",
        v =>
          (v.length >= 3 && v.length <= 20) ||
          "Login length must be in range from 3 to 20 characters",
        v => !v.includes("  ") || "Login can not contain two spaces in a row"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          v.length >= 8 || "Password length must not be less than 8 characters",
        v => !v.includes(this.login) || "Password can not include login"
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          login: this.login,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => this.$router.push("/"))
          .catch(err => console.error(err));
      }
    }
  },
  created() {
    if (this.$route.query["loginError"]) {
      this.$store.dispatch("setError", "Please sign in to access this page")
    }
  }
};
</script>
