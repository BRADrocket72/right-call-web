<template>
  <div>
  <LoginNavBar />
  <br/><br/>
    <div id="app">
    <!-- <div id="alert" v-if="alert">{{ alert }}</div> -->
    <h1>Registration  Page</h1>
    <br><br>
    <form @submit.prevent="loginWithPassword">
      <label>
        Email or username
        <input type="text" id="userName" />
      </label>
      <label>
        Password
        <input type="password" id="password" />
      </label>
      <br/><br/>
      <h3>Are you an Student, Instructor, or Admin?</h3>
      <label> Student: </label>
      <input type="radio" name="userType" id="userType" value="Student" checked>
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
</div>
</template>

<script>

import { useUsersStore } from "@/stores/UserStore";
import LoginNavBar from "@/components/LoginNavBar.vue";

export default {
  name: 'LoginPage',
  components: {
    LoginNavBar
  },
  methods: {
    async uploadUsers(){
      var userStore = useUsersStore();
      var userName = document.getElementById("userName").value
      var password = document.getElementById("password").value
      var userTypes = document.getElementsByName("userType")
      for (let i=0; i< userTypes.length; i++) {
        if (userTypes[i].checked) {
          var userType = userTypes[i].value
        }
      }
      
      await userStore.postUser(userName, password, userType)
      this.$router.push({
        name: "LessonSelection"
      });
      
    }
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