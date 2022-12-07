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
      <div class="uploading-video-div">
        <p v-if="uploading" class="upload-in-progress">Please wait, upload in progress...</p>
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
      videoName: "",
      uploading: false
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
      this.uploading = true
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
  flex-direction: column;
  width: 100%;
}

.video-info-div {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.video-info-div label {
  text-align: left;
  font-weight: bold;
}

.video-info-div input {
  margin: 10px 0 30px 0;
  width: 300px;
}

.video-info-div button {
  width: 200px;
  height: 50px;
}

.uploading-video-div {
  display: flex;
}

.upload-in-progress {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0 0 0;
}
</style>