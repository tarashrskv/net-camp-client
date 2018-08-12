<template>
    <v-container >
      <v-layout align-center>
        <v-flex>
          <h3 class="display-2">Welcome to the site dedicated to Eleks .NET Camp 2018</h3>
          <v-divider class="my-3"></v-divider>
          <span class="subheading">
              .NET Core              
              ASP.NET Core <br>
              Entity Framework Core <br>
              Automapper <br>
              Cloudinary <br>
              FluentValidation <br>
              NLog <br>
              Vue.js <br>
              Vuetify <br>
              Axios <br>
          </span>
           <v-divider class="my-3"></v-divider>
           <div class="title mb-3">Don't hesitate and press the button!</div>
          <router-link to="/games"> <v-btn
            class="mx-0"
            color="primary"
            large
          >
           Lets play :3
          </v-btn>
         </router-link>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
