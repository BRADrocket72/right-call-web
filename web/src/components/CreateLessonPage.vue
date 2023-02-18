<template>
    <div>
      <LoggedInNavBarVue />
      <br /><br />
      <div class="upload-video-div">
        <div class="video-info-div">
          <label for="lesson-name">Name of Lesson: </label><input type="text" id="lesson-name" name="lesson-name" />
          <label for="description">Description of Lesson: </label><textarea id="description" name="description"> </textarea> <br/>
          <label for="videoUpload">Upload Video Files To Lesson: </label><input type="file" id="videoUpload" name="file" v-on:change="fileChange" multiple="multiple"/>
          <button id="upload-button" @click="uploadLesson">Upload Lesson</button>
        </div>
        <div class="uploading-video-div">
          <p v-if="uploading" class="upload-in-progress">Please wait, upload in progress...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useVideoClipStore } from "@/stores/VideoClipStore";
  import { useLessonStore } from "@/stores/LessonsStore"
  import LoggedInNavBarVue from "./LoggedInNavBar.vue";
  
  export default {
    name: "VideoUpload",
    components: {
      LoggedInNavBarVue,
    },
    data() {
      return {
        videoName: "",
        uploading: false,
        uploadedVideos: [],
        videoUrls: []
      }
    },
    mounted() {
    },
    methods: {
      fileChange() {
        const fileInput = document.getElementById("videoUpload");
        for (let i=0; i<fileInput.files.length; i++) {
          this.videoUrls.push(fileInput.files[i])
        }
      },
      async uploadLesson() {
        await this.uploadVideo();
        const lessonName = document.getElementById("lesson-name").value
        const description = document.getElementById("description").value
        var lessonStore = useLessonStore();
        await lessonStore.postLesson(lessonName, "Admin", description, this.uploadedVideos)
      },
      async uploadVideo() {
        this.uploading = true
        var videoClipStore = useVideoClipStore();
        for (let i=0; i<this.videoUrls.length; i++) {
          this.uploadedVideos.push(await videoClipStore.postVideo(this.videoUrls[i]," "))
        }
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