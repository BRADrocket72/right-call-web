<template>
  <div class="content-container">
    <NavBar />
    <div class="container">
      <div class="video-container">
        <LessonSelection title="Lesson Selection Page"/>
        <!-- This VideoEditor line below will need to be moved to the LessonSelection page, because that's where the video will be slected and VideoClop object created -->
        <VideoEditor v-if="ready" :video="sampleVideo" title="RefReps Video Editor" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Navbar.vue";
import VideoEditor from './components/VideoEditor.vue'
import VideoClip from "@/models/VideoClip.js"
import LessonSelection from "./components/LessonSelection.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    VideoEditor,
    LessonSelection
},
  // With the lesson selection page, when the user clicks on a lesson, create a videoClip object and pass that as a prop to the videoEditor component.
  // It currently works right now, but this data() and mounted() should be deleted from this file when lessonSelection file is created,
  // because I created a sample VideoClip object in this file, but it will be created in the LessonSelection page
  data() {
    return {
      sampleVideo: VideoClip,
      ready: false,
    }
  },
  mounted() {
    this.sampleVideo = new VideoClip("sampleVid", 125, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", [3.7, 14.2, 30.3])
    this.ready = true;
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
