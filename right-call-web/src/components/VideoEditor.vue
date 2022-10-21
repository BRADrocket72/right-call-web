<template>
  <div class="video-player">
      <h1>{{title}}</h1>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <video :id="video.id" :src="video.videoUrl" controls />
  </div>
</template>

<script>
import "../assets/prototype_withAudio.webm"
// import VideoClip from "@/models/VideoClip.js"

export default {
  name: 'VideoEditor',
  props: {
    title: String,
    video: Object
  },
  mounted() {
    const video2 = document.getElementById(this.video.id);
    video2.addEventListener('timeupdate', () => {    //listen for when the video's time changes
      this.stopVideoAtTimestamp(video2, this.video.timestamps)
    })
    
    
  },
  methods: {
    stopVideoAtTimestamp(video, timestamps) {
      var currentTime = video.currentTime;
      if (currentTime >= timestamps[0]) {
        timestamps.shift()  // remove first timestamp
        video.pause();
      }
    },
    
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 100%;
  display: block;
  margin: 0 auto;
}

/*.video-player {
  margin: 0 auto;
  text-align: center;
}*/
</style>


