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
      <VideoEditor :video="selectedVideo"/>
    </div>
  </div>
</template>

<script>
import VideoClip from "@/models/VideoClip.js"
import VideoEditor from "@/components/VideoEditor.vue"

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
    retrieveVideos() {
      var VideoOne = new VideoClip("Basketball Lesson One", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", [2.2, 6.8])
      var VideoTwo = new VideoClip("Basketball Lesson Two", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul_2.m4v", [3.2, 6.8])
      var VideoThree = new VideoClip("Basketball Lesson Three", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P3_Traveling.m4v", [4.2, 6.8])
      return[VideoOne , VideoTwo , VideoThree]
    },
    openVideo(video) {
      this.selectedVideo = video
    }
  },
  mounted() {
    this.VideoClips = this.retrieveVideos()
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
  }
</style>