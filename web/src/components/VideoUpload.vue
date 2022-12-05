<template>
  <div>
    <LoggedInNavBarVue />
    <br /><br />
    <div>
      <label><h4>Upload Video File:</h4></label>
      <input
        type="file"
        id="videoUpload"
        name="file"
        v-on:change="fileChange"
      />
      <br />
      <button @click="uploadVideo">Upload Video</button>
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
      this.videoFile = fileInput.files[0];
      console.log(this.videoFile);
    },
    async uploadVideo() {
      var videoClipStore = useVideoClipStore();
      await videoClipStore.postVideo(this.videoFile);
      this.$router.push({name: "AdminPage"})
    },
  },
};
</script>