<template>
    <LoginNavBar />
    <br/><br/>
    <div id="app">
    <h1>Login  Page</h1>
    <br><br>
    <form @submit.prevent="loginWithPassword">
      <label>
        Email or username
        <input type="text" id="userName" v-model="username" />
      </label>
      <label>
        Password
        <input type="password" id="password" v-model="password" />
      </label>
      <br/><br/>
      <button type="submit" @click="login">Log in</button>
    <div v-if = "error">
      Invalid Username or Password
    </div>
    </form>
    <nav></nav>
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
  data(){
    return {
      error:false,
      username: "",
      password: ""
    }
  },
  methods: {
    async login(){
      var userStore = useUsersStore();
      var userName = document.getElementById("userName").value
      var password = document.getElementById("password").value
      
      var loginStatus = await userStore.loginUser(userName, password)
      if (!loginStatus.success){
          this.error = true
      }else{
        userStore.currentUserToken = loginStatus.accessToken
        userStore.currentUserType = loginStatus.userType
        console.log(userStore.currentUserType)
         if (userStore.currentUserType == "Student") {
          this.$router.push({
            name: "LessonSelection"
          })
        }
        else {
          this.$router.push({
            name: "AdminPage"
          })
        }
      }
      
    }
  },
  watch: {
        username() {
            this.error = false;
        },
        password() {
            this.error = false;
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