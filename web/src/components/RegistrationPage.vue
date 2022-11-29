<template>
    <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>
    <h1>Login  Page</h1>
    <br><br>
    <form @submit.prevent="loginWithPassword">
      <label>
        Email or username
        <input type="text" id="userName" v-model="emailOrUsername" />
      </label>
      <label>
        Password
        <input type="password" id="password" v-model="password" />
      </label>
      <br/><br/>
      <h3>Are you an Student, Instructor, or Admin?</h3>
      <label> Student: </label>
      <input type="radio" name="userType" id="userType" value="Student">
      <br/>
      <label>Instructor: </label>
      <input type="radio" name="userType"  id="userType" value="Instructor"/>
      <br/>
      <label> Admin: </label>
      <input type="radio" name="userType"  id="userType" value="Admin"/>
      <br/><br/>
      <button type="submit" @click="uploadUsers">Log in</button>
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
    async uploadUsers(){
      var userName = document.getElementById("userName").value
      var password = document.getElementById("password").value
      var userType = document.getElementById("userType").value
      
      await this.postUser(userName, password, userType)
      this.$router.push({
        name: "LessonSelection"
      });
      
    }
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