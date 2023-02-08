<template>
<div>
  <LoginNavBar />
  <div class="login-div">
    <h1>Sign in to your account</h1>
    <form @submit.prevent="loginWithPassword">
      <div class="input">
        <label for="userName">Email or Username</label>
        <input type="text" id="userName" v-model="username" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div v-if="error" class="error">
        <p>Invalid Username or Password</p>
      </div>
      <div class="input">
        <button type="submit" class="submit" @click="login">Sign In</button>
      </div>
    </form>
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
  data(){
    return {
      error:false,
      username: "",
      password: ""
    }
  },
  mounted() {
    if (this.$cookies.isKey("user_session")){
      this.$cookies.remove("user_session")
    }
  },
  methods: {
    async login(){
      var userStore = useUsersStore();
      var userName = document.getElementById("userName").value
      var password = document.getElementById("password").value
      
      var loginStatus = await userStore.loginUser(userName, password)
      var user = { currentUserName: userName, currentUserType: loginStatus.userType, currentUserToken: loginStatus.accessToken, currentEyeTrackingCalibration: "false"}
      this.$cookies.set("user_session",user, "3d")
      if (!loginStatus.success){
          this.error = true
      }else{
        if (loginStatus.userType == "Student") {
          this.$router.push({
            name: "LessonSelection"
          })
        } else if(loginStatus.userType == "Instructor") {
          this.$router.push({
            name: "InstructorPage"
          })
        }else {
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

<style scoped>

.login-div {
  min-height: 400px;
  max-height: 400px;
  min-width: 600px;
  max-width: 600px;
  border: 8px solid #0e333c;
  border-radius: 12px;
  margin: 100px auto;
  box-shadow: 0 10px 10px #d1d1d1;
}

.login-div h1 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
}

.input {
  width: 100%;
  text-align: left;
  margin: auto auto 15px 120px;
}

.input input {
  min-width: 350px;
  max-width: 350px;
  min-height: 40px;
  min-height: 40px;
  background: #e9e9e9;
  border: 1px solid #0e333c;
  border-radius: 6px;
  font-size: 22px;
}

.input label {
  width: 100%;
  font-size: 20px;
}

.submit {
  width: 90%;
  height: 60px;
  margin: 50px 0 0 -90px;
  font-size: 25px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 1px black;
  border: none;
  border-radius: 10px;
  background: #0e333c;
}

.submit:hover {
  box-shadow: 0 5px 5px #d5d5d5;
  text-shadow: 0 3px 3px #000000;
}

.error {
  position: absolute;
  margin-left: 140px;
  color: #ed3419;
  font-size: 20px;
  font-weight: bold;
}
</style>