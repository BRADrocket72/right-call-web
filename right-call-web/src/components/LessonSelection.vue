<template>
    <div>
        <h1>{{title}}</h1>
    </div>
</template>

<script>
import "../assets/prototype_withAudio.webm"
// import VideoClip from "@/models/VideoClip.js"
//@TODO This page must display a list of links of lessons
//    which would have a video object .
//The user picked lesson to VideoEditor .

export default {
  name: 'VideoEditor',
  props: {
    title: String
  }
}   
</script>