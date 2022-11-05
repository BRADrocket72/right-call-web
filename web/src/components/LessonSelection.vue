<template>
  <div v-if="ready">
    <div v-if="selectedVideo == null" class="lesson-container">
      <div class="div-header">
        <h1>Lesson Selection Page</h1>
      </div>
      <div class="lesson-div">
        <div class="lesson" v-for="video in VideoClips" :key="video.id">
          <a class="nav-link" @click="openVideo(video)">
            <img class="lesson-img" :alt="video.id" src="../../images/richard-bagan-SmQ2Cku3alc-unsplash.jpg">
            <p>{{video.id}}</p> 
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <VideoEditor :video="selectedVideo" @close="closeVideo"/>
    </div>
  </div>
</template>

<script>
import VideoEditor from "@/components/VideoEditor.vue"
import {retrieveVideos} from "@/models/RetrieveAndCreate.js"

export default {
  name: 'LessonSelection',
  components: {
    VideoEditor
  },
  data() {
    return{
      ready: false,
      VideoClips: [], //declare VideoClips as an array
      selectedVideo: null
    }
  },
  methods: {
    openVideo(video) {
      this.selectedVideo = video;
    },
    closeVideo(){
      this.selectedVideo = null
    }
  },
  mounted() {
    this.VideoClips = retrieveVideos()
    this.ready = true
  }
}
</script>

<style scoped>
  .lesson-container {
    
    justify-content: center;
    width: 100%;
    margin: auto;
  }

  .div-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin: 0 auto 20px auto;
  }

  .lesson-div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
  }

  .lesson {
    margin: 0 2% 0 2%;
    text-align: left;
    height: 480px;
    width: 285px;
    box-shadow:0 10px 10px #d1d1d1;
  }

  .lesson-img {
    margin: none;
    width: 285px;
    height: 170px;
  }

  .lesson-div a {
    cursor: pointer;
  }

  .lesson-div p {
    padding: 15px 0 0 20px;
    font-weight: bold;
  }
</style>