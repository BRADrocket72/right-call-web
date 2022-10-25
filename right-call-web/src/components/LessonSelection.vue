<template>
    <div v-if="ready"> 
        <h1>Lesson Selection Page</h1>
        <br>
        <a class="nav-link" v-for="video in VideoClips" :key="video.id" > {{video.id}} </a>
    </div>
</template>

<script>
import "../assets/prototype_withAudio.webm"
import VideoClip from "@/models/VideoClip.js"

export default {
  name: 'LessonSelection',
  data() {
    return{
      ready :false,
      VideoClips :[] //declare VideoClips as an array
    }
  },
  methods: {
    retrieveVideos() {
      //this method will contain multiple video objects (return type array)
      var VideoOne = new VideoClip("basketball lesson one", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", [2.2, 6.8])
      var VideoTwo = new VideoClip("basketball lesson two", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul_2.m4v", [2.2, 6.8])
      var VideoThree = new VideoClip("basketball lesson three", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P3_Traveling.m4v", [2.2, 6.8])
      return[VideoOne , VideoTwo , VideoThree]
    }
  },
  mounted() {
    this.VideoClips = this.retrieveVideos()
    this.ready = true
  }
}
</script>