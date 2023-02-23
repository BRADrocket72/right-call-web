<template>
    <div>
      <LoggedInNavBarVue />
      <br /><br />
      <div>
        <label><h4>Select Lesson to Delete: </h4></label>
        <div class="video-list-div" >
            <div class="lesson" v-for="video in this.lessons" :key="video.id">
                <a class="nav-link" @click="videoSelection(video)">
                    <h1>{{video.videoName}}</h1>
                </a>   
                <p>View Video Before Deletion:</p> 
                <p class="video-link"><a :href="video.videoURL" target="_blank">{{video.videoURL}}</a></p>
            </div>
        </div>
        <br />
      </div>
      <LessonDeletionModal v-if="isVideoSelected" :selectedVideo="selectedVideo" @close="closeModal"></LessonDeletionModal>
    </div>
</template>
  
<script>
  import { useVideoClipStore } from "@/stores/VideoClipStore";
  import LoggedInNavBarVue from "./LoggedInNavBar.vue";
  import LessonDeletionModal from "@/components/modals/LessonDeletionModal.vue"
  
  export default {
    name: "LessonDeletion",
    components: {
      LoggedInNavBarVue,
      LessonDeletionModal
    },
    props:{},
    data() {
        return {
            lessons: [],
            selectedVideo: "",
            isVideoSelected: false
        }
    },
    async mounted() {
      var videoClipLessons = useVideoClipStore()
      this.lessons = await videoClipLessons.fetchVideoClips();
    },
    methods: {
        closeModal(){
            this.isVideoSelected = false
        },
        videoSelection(video) {
            this.selectedVideo = video
            this.isVideoSelected = true
        }
    },
  };
</script>
<style scoped>
.video-list-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-width: 100%;
  margin: 0 auto;
}

.lesson {
  flex: 1 1 25%;
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

.nav-link h1 {
  margin: none;
  min-width: 285px;
  height: 170px;
  border-radius: 6px 6px 0 0;
}

.lesson p {
    margin: 20px 0 0 0;
}
.video-list-div a {
    cursor: pointer;
    max-width: 300px;
}

.video-list-div p {
  max-width: 300px;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  font-weight: bold;
}

.nav-link {
    min-height: 150px;
}
.nav-link h1 {
    height: 150px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    white-space: normal;
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
    background: #0e333c;
}

.video-link {
  margin: none;
  width: 285px;
  height: 170px;
}


</style>