<template>
    <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>
    <h1>Login  Page</h1>
    <br><br>
    <form @submit.prevent="loginWithPassword">
      <label>
        Email or username
        <input type="text" v-model="emailOrUsername" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Log in</button>
    </form>
    <nav></nav>
  </div>
</template>

<script>

import { useUsersStore } from "@/stores/UserStore";
    
export default {
  name: 'LoginPage',
  setup() {
        var Users = useUsersStore();
        return Users;
    },

  methods: {
    async uploadUsers(){}
  },
  mounted() {
    // const videoUrl = document.getElementById("urlUpload")
  }
}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #4AAE9B;
}

.button {
    width: 86px;
    height: 40px;
    border: 1px solid #0e333c;
    background: #FFFFFF;
}

</style>