<template>
<div class="content-container">
    <NavBar />
    <div class="container">
        <div class="video-container">
            <VideoEditor msg="RefReps Video Editor"/>
        </div>
    </div>
</div>
</template>

<script>

/*import HelloWorld from './components/HelloWorld.vue'*/
import NavBar from "./components/Navbar.vue";
import VideoEditor from './components/VideoEditor.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    VideoEditor
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
