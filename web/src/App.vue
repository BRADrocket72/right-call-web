<template>
  <div class="content-container">
    <div class="container">
      <div class="video-container">
        <router-view></router-view> <!-- Since Lesson Selection is the home page in routes.js, LessonSelection is automatically the home page in this routerView-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
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

.container {
  height: 100vh;
}
</style>
