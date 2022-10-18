<template>
  <div class="video-player">
      <h1>{{msg}}</h1>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <video id="myVideoPlayer" src="../assets/prototype_withAudio.webm" controls />
  </div>
</template>

<script>
export default {
  name: 'VideoEditor',
  props: {
    msg: String
  },
  mounted() {
    const video = document.getElementById('myVideoPlayer');
    let timestamps = [3.7, 14.2, 30.3]   //make an array out of provided sample timestamps

    
    video.addEventListener('timeupdate', () => {    //listen for when the video's time changes
      stopVideoAtTimestamp(video, timestamps)
    })
    
    
  }
}

function stopVideoAtTimestamp(video, timestamps) {

  var currentTime = video.currentTime;
  if (currentTime >= timestamps[0]) {
    timestamps.shift()   // remove first timestamp
    video.pause();
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


