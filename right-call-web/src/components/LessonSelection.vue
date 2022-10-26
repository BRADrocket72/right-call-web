<template>
    <div v-if="ready"> 
      <div v-if="selectedVideo == null">
        <h1>Lesson Selection Page</h1>
        <br>
        <a class="nav-link" v-for="video in VideoClips" :key="video.id" @click="openVideo(video)"> {{video.id}} </a>
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