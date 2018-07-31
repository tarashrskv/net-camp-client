<template>
     <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-2">Welcome to the site dedicated to Eleks .NET Camp 2018</h3>
          <v-divider class="my-3"></v-divider>
          <span class="subheading">              
              Some words about me
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
  </v-jumbotron>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
