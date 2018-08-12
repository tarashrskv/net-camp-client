<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration</v-toolbar-title> 
              </v-toolbar>
              <v-card-text>
                <v-form
                enctype="multipart/form-data"
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
                   prepend-icon="lock"
                   name="password"
                   label="Password"
                   type="password"
                   :rules="passwordRules">
                   </v-text-field>
                  <v-text-field
                   v-model="confirmPassword"
                   prepend-icon="lock"
                   name="confirm-password"
                   label="Confirm password"
                   type="password"
                   :rules="confirmPasswordRules">
                   </v-text-field>
                   <v-layout row class="mb-3">
                     <v-flex xs12>
                   <v-btn @click="showUpload" class="success"><fa pull="left" icon="camera-retro"/>Set avatar</v-btn>
                   <input ref="avatarInput" type="file" style="display: none;" accept="image/*" @change="onFileChange">
                     </v-flex>
                   </v-layout>
                   <v-layout row>
                     <v-flex xs12>
                   <img :src="imageSrc" height="150" v-if="imageSrc">
                     </v-flex>
                   </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary" :loading="loading" :disabled="(!valid || !avatar) || loading">Register</v-btn>
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
      avatar: null,
      confirmPassword: "",
      valid: false,
      imageSrc: "",
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
        v =>
          !v.toLowerCase().includes(this.login.toLowerCase()) ||
          "Password can not include login"
      ],
      confirmPasswordRules: [
        v => !!v || "Password confirmation is needed in order to continue",
        v => v === this.password || "Passwords are not equal"
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
      if (this.$refs.form.validate() && this.avatar) {
        // const user = {
        //   login: this.login,
        //   password: this.password,
        //   avatar: this.avatar
        // };

        const formData = new FormData();
        formData.append("login", this.login);
        formData.append("password", this.password);
        formData.append("avatar", this.avatar);
        
        this.$store
          .dispatch("registerUser", formData)
          .then(() => this.$router.push("/login"))
          .catch(err => console.error(err));
      }
    },
    showUpload() {
      this.$refs.avatarInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
      }
      reader.readAsDataURL(file);
      this.avatar = file;
    }
  }
};
</script>