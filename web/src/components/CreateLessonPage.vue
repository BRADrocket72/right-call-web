<template>
    <div>
      <LoggedInNavBarVue />
      <br /><br />
      <div class="upload-video-div">
        <div class="video-info-div">
          <label for="lesson-name">Name of Lesson: </label><input type="text" id="lesson-name" name="lesson-name" />
          <label for="description">Description of Lesson: </label><textarea id="description" name="description"> </textarea> <br/>
          <label for="videoUpload">Upload Video Files To Lesson: </label><input type="file" id="videoUpload" name="file" v-on:change="fileChange" multiple="multiple"/>
          <div v-if="isFileChanged">
            <div v-for="videoFile in videosToUpload" :key="videoFile">
              <label for="fileUpload">Edit Official Name of Video: </label><input type="text" id="fileUpload" name="fileUpload" v-model="videoFile.videoTitle" />
            </div>
          </div>
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
        videosToUpload: [],
        isFileChanged: false
      }
    },
    mounted() {
    },
    methods: {
      fileChange() {
        const fileInput = document.getElementById("videoUpload");
        for (let i=0; i<fileInput.files.length; i++) {
          this.videosToUpload.push({
            file: fileInput.files[i],
            videoTitle: fileInput.files[i].name
          });
        }
        this.isFileChanged = true
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
        for (let i=0; i<this.videosToUpload.length; i++) {
          this.uploadedVideos.push(await videoClipStore.postVideo(this.videosToUpload[i].file, this.videosToUpload[i].videoTitle))
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