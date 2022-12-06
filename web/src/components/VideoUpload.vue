<template>
  <div>
    <LoggedInNavBarVue />
    <br /><br />
    <div class="upload-video-div">
      <div class="video-info-div">
        <label for="videoUpload">Upload Video File: </label><input type="file" id="videoUpload" name="file" v-on:change="fileChange" />
        <label for="video-name">Name of Video: </label><input type="text" id="video-name" name="video-name" />
        <button @click="uploadVideo">Upload Video</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useVideoClipStore } from "@/stores/VideoClipStore";
import { useUsersStore } from "@/stores/UserStore";
import LoggedInNavBarVue from "./LoggedInNavBar.vue";

export default {
  name: "VideoUpload",
  components: {
    LoggedInNavBarVue,
  },
  data() {
    return {
      videoName: ""
    }
  },
  mounted() {
    var userStore = useUsersStore();
    if (userStore.currentUserToken.length < 1) {
      this.$router.push({
        name: "LoginPage",
      });
    }
  },
  methods: {
    fileChange() {
      const fileInput = document.getElementById("videoUpload");
      this.videoURL = fileInput.files[0]
    },
    async uploadVideo() {
      const videoName = document.getElementById('video-name')
      this.videoName = videoName.value
      var videoClipStore = useVideoClipStore();
      await videoClipStore.postVideo(this.videoURL,this.videoName);
      this.$router.push({name: "AdminPage"})
    },
  },
};
</script>

<style scoped>
.upload-video-div {
  display: flex;
  justify-content: center;
}

.video-info-div {
  display: flex;
  flex-direction: column;
}

.video-info-div label {
  text-align: left;
}

.video-info-div input {
  margin: 10px 0 30px 0;
}
</style>