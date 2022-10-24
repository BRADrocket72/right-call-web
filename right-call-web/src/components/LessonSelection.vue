<template>
  <div v-if="ready">
      <h1>Select a Lesson</h1>
      <VideoEditor v-if="ready" :video="sampleVideo" />
  </div>
</template>

<script>

import VideoEditor from "@/components/VideoEditor.vue"
import VideoClip from "@/models/VideoClip.js"
//@TODO This page must display a list of links of lessons
//    which would have a video object .
//The user picked lesson to VideoEditor .

export default {
name: 'LessonSelection',
components: {
VideoEditor  
},
data() {
  return {
    sampleVideo: VideoClip,
    ready: false,
  }
},
methods: {
  //add retrieveVideos() function that just creates multiple videoclip objects like in mounted below
  // return array that contains all the videoClips created

},
mounted() {
  this.sampleVideo = new VideoClip("Basketball Lesson", 125, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", [3.7, 14.2, 30.3])
  this.ready = true;
}
}
</script>