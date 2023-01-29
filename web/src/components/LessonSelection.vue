<template>
<div>
  <LoggedInNavBar />
  <br/><br/>
  <div v-if="ready">
      <div class="div-header">
        <h1>Lesson Selection Page</h1>
      </div>
      <div class="lesson-div" v-if="this.videoClips.length > 0">
        <div class="lesson" v-for="video in this.videoClips" :key="video._id">
          <a class="nav-link" @click="openVideo(video._id)">
            <img class="lesson-img" :alt="video._id" src="../../images/richard-bagan-SmQ2Cku3alc-unsplash.jpg" />
            <p>{{ video.videoName }}</p>
          </a>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import { useVideoClipStore } from "@/stores/VideoClipStore";
import LoggedInNavBar from "./LoggedInNavBar.vue";

export default {
    name: "LessonSelection",
    components: { LoggedInNavBar },
    data() {
        return {
            ready: false,
            videoClips: []
        };
    },
    props:{},
    methods: {
        openVideo(videoID) {
            this.$router.push({
                name: "VideoEditor",
                params: {
                    videoId: videoID
                }
            });
        }
    },
    async mounted() {
        var videoClip = useVideoClipStore();
        this.videoClips = await videoClip.fetchVideoClips();
        this.ready = true;
    }
};
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
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}

.nav-link {
    min-height: 350px;
}

.lesson {
  flex: 1 0 25%;
  margin: 0 30px 30px 0;
  text-align: left;
  height: 350px;
  max-height: 350px;
  width: 285px;
  max-width: 285px;
  border-radius: 6px;
  box-shadow: 0 10px 10px #d1d1d1;
}

.lesson:hover {
    box-shadow: 0 15px 15px #d1d1d1;
}

.lesson-img {
  margin: none;
  width: 285px;
  height: 170px;
  border-radius: 6px 6px 0 0;
}

.lesson-div a {
  cursor: pointer;
}

.lesson-div p {
  padding: 15px 0 0 20px;
  font-weight: bold;
}
</style>