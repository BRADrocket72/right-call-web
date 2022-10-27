<template>
  <div class="video-player">
      <h1>{{video.id}}</h1>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <video :id="video.id" :src="video.videoUrl" controls />
      <Modal
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Modal from './components/PopUp.vue';
// import VideoClip from "@/models/VideoClip.js"

export default {
  name: 'VideoEditor',
  components: {
    Modal
  },
  data() {
      return {
        isModalVisible: false,
      };
    },
  props: {
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
        timestamps.shift()   // remove first timestamp
        video.pause();
        this.showModal();
      }
    },
    showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 75%;
  height: 75%;
  display: block;
  margin: 0 auto;
}

/*.video-player {
  margin: 0 auto;
  text-align: center;
}*/
</style>