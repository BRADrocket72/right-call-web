<template>
  <div v-if="ready">
      <div class="div-header">
        <h1>Lesson Selection Page</h1>
      </div>
      <div class="lesson-div" v-if="this.videoClips.length > 0">
        <div class="lesson" v-for="video in this.videoClips" :key="video._id">
          <a class="nav-link" @click="openVideo(video._id)">
            <img class="lesson-img" :alt="video._id" src="../../images/richard-bagan-SmQ2Cku3alc-unsplash.jpg" /> -->
            <p>{{ video._id }}</p>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
import { useVideoClipStore } from "@/stores/VideoClipStore";
import { useUsersStore } from '@/stores/UserStore';

export default {
  name: "LessonSelection",
  data() {
    return {
      ready: false,
      videoClips: []
    };
  },
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
  setup() {
    var VideoClip = useVideoClipStore();
    return VideoClip;
  },
  async mounted() {
    var store = useUsersStore();
    if (store.currentUserToken.length < 1) {
      this.$router.push({
        name: "LoginPage"
      })
    }
    await this.fetchVideoClips();
    this.VideoClips = this.clips;
    this.ready = true;
  },
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
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}

.lesson {
  margin: 0 2% 0 2%;
  text-align: left;
  height: 300px;
  width: 285px;
  box-shadow: 0 10px 10px #d1d1d1;
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