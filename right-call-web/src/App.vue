<template>
<!---<img alt="Vue logo" src="./assets/logo.png"/>
<HelloWorld msg="Welcome to Your Vue.js App"/>-->
<NavBar />
</template>

<script>

/*import HelloWorld from './components/HelloWorld.vue'*/
import NavBar from "./components/Navbar.vue";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
