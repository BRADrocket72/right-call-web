<template>
<div class="register-container">
  <LoginNavBar />
  <div class="register-div">
    <h1>Registration</h1>
    <form @submit.prevent="loginWithPassword">
      <div class="invalid" id="invalid-user">!</div>
      <div class="input">
        <label>Username</label>
        <input type="text" id="userName" class="input-text" autocomplete="off" />
      </div>
      <div class="invalid" id="invalid-email">!</div>
      <div class="input">
        <label>Email</label>
        <input type="text" id="email" class="input-text" autocomplete="off" />
      </div>
      <div class="invalid" id="invalid-password">!</div>
      <div class="input">
        <label>Password</label>
        <input type="password" id="password" class="input-text" />
      </div>

      <p id="invalid"></p>

      <h3>Account Type</h3>
      <div class="account-type">
        <div class="radio-button">
          <label for="userType"> Student: </label>
          <input type="radio" name="userType" id="student" value="Student" class="input-radio" checked>
        </div>
        <div class="radio-button">
          <label for="instructor">Instructor: </label>
          <input type="radio" name="userType"  id="instructor" value="Instructor" class="input-radio"/>
        </div>
        <div class="radio-button">
          <label for="admin"> Admin: </label>
          <input type="radio" name="userType"  id="admin" value="Admin" class="input-radio"/>
        </div>
      </div>
      <div>
        <button type="submit" class="submit" @click="checkInputs">Register</button>
      </div>
      <div class="redirect-login">
        <p>Already have an account? <a class="to-login" @click="redirectToLogin" >Login Here</a></p>
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
  methods: {
    checkInputs() {
      const username = document.getElementById('userName').value
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

      let invalidUser = document.getElementById('invalid-user')
      let invalidEmail = document.getElementById('invalid-email')
      let invalidPassword = document.getElementById('invalid-password')

      if(username == "" || email == "" || password == "") {
        if(username == "") {
          invalidUser.style.display = "block"
        } else {
          invalidUser.style.display = "none"
        }
        if(email == "") {
          invalidEmail.style.display = "block"
        } else {
          invalidEmail.style.display = "none"
        }
        if(password == "") {
          invalidPassword.style.display = "block"
        } else {
          invalidPassword.style.display = "none"
        }
        alert("Please fill in all inputs.")
      } else {
        invalidUser.style.display = "none"
        invalidEmail.style.display = "none"
        invalidPassword.style.display = "none"
        this.uploadUsers(username, email, password)
      }
    },
    async uploadUsers(userName, email, password){
      var userStore = useUsersStore()
      var userTypes = document.getElementsByName("userType")
      var userType = ""
      for (let i=0; i< userTypes.length; i++) {
        if (userTypes[i].checked) {
          userType = userTypes[i].value
        }
      }
      await userStore.postUser(userName,email, password, userType)
      this.$router.push({
        name: "LoginPage"
      })
    },
    redirectToLogin() {
      this.$router.push({
        name: "LoginPage"
      })
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 110vh;
}

.register-div {
  min-height: 600px;
  max-height: 600px;
  min-width: 600px;
  max-width: 600px;
  border: 8px solid #0e333c;
  border-radius: 10px;
  margin: 20px auto;
  box-shadow: 0 10px 10px #d1d1d1;
}

.register-div h1 {
  margin-top: 10px;
  font-weight: bold;
}

.register-div h3 {
  margin-top: 20px;
  font-weight: bold;
}

.input {
  width: 100%;
  text-align: left;
  margin: auto auto auto 120px;
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

.input input:focus {
  background-color: #ffffff;
  border: 2px solid #0e333c;
}

.input-text {
  min-width: 250px;
  max-width: 250px;
}

.input label {
  width: 100%;
  font-size: 20px;
}

.account-type {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.radio-button {
  width: 100%;
  text-align: left;
  margin-left: 230px;
}

.input-radio {
  height: 15px;
  width: 15px;
}

.input-radio:hover {
  cursor: pointer;
}

.radio-button label {
  min-width: 100px;
  margin: 5px 5px 5px 0;
  text-align: left;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #4AAE9B;
}

.submit {
  width: 90%;
  height: 60px;
  margin-top: 20px;
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

.redirect-login {
  margin-top: 14px;
}

.to-login {
  font-weight: bold;
}

.invalid {
  display: none;
  position: absolute;
  margin: 28px 0 0 100px;
  color: #ed3419;
  font-weight: bold;
  font-size: 30px;
}
</style>