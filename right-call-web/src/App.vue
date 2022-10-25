<template>
  <div class="content-container">
    <NavBar />
    <div class="container">
      <div class="video-container">
        <router-view></router-view> <!-- Since Lesson Selection is the home page in routes.js, LessonSelection is automatically the home page in this routerView-->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Navbar.vue";

export default {
  name: 'App',
  components: {
    NavBar
}, 
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
