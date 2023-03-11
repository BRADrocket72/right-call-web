<template>
    <div>
      <LoggedInNavBarVue />
      <br /><br />
      <div v-if="isLessonSelected == false">
        <label><h4>Select Lesson to Delete: </h4></label>
        <div class="video-list-div" >
            <div class="lesson" v-for="lesson in lessons" :key="lesson._id">
                <div class="nav-link">
                    <h1>{{lesson.name}}</h1>
                </div>   
                <br/>
                <p class="video-link">
                  <a @click="lessonSelection(lesson)">Delete the Entire Lesson</a> 
                  <br/><br/>
                  <a @click="deleteSpecificVideo(lesson)">Delete Video in Lesson</a> 
                </p>
            </div>
        </div>
        <br />
      </div>
      <div v-if="isLessonSelected">
        <label><h4>Select Video to Delete: </h4></label>
        <div class="video-list-div">
          <div class="lesson" v-for="video in videoClips" :key="video._id">
              <a class="nav-link" @click="videoSelection(video)">
                  <h1>{{video.videoName}}</h1>
              </a>   
              <br/>
              <p>View Video Before Deletion:</p> 
              <p class="video-link"><a :href="video.videoURL" target="_blank">{{video.videoURL}}</a></p>
          </div> 
        </div>
      </div>
      <LessonDeletionModal v-if="isVideoSelected" :deletionType="isLessonOrVideo" :selectedLesson="selectedLesson" :selectedVideo="selectedVideo" @close="closeModal"></LessonDeletionModal>
    </div>
</template>
  
<script>
  import { useLessonStore } from "@/stores/LessonsStore";
  import { useVideoClipStore } from "@/stores/VideoClipStore"
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
            isVideoSelected: false,
            isLessonSelected:false,
            videoClips: [],
            selectedLesson: "",
            isLessonOrVideo: false
        }
    },
    async mounted() {
      var adminLessons = useLessonStore()
      this.lessons = await adminLessons.getAllLessons()
    },
    methods: {
        closeModal(){
            this.isVideoSelected = false
        },
        lessonSelection(lesson) {
            this.selectedVideo = ""
            this.selectedLesson = lesson
            this.isLessonOrVideo = "lesson"
            this.isVideoSelected = true
        },
        videoSelection(video){
          this.selectedVideo = video
          this.isLessonOrVideo = "video"
          this.isVideoSelected = true
        },
        async deleteSpecificVideo(lesson) {
          var videoClip = useVideoClipStore();
          this.isLessonSelected = true
          this.selectedLesson = lesson
          for (let i=0;i<lesson.videoClipsArray.length;i++) {
            this.videoClips.push(await videoClip.fetchVideoClipById(lesson.videoClipsArray[i]._id))
          }
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
  text-decoration: underline;
  text-align: center;
  color:#0e333c;
}


</style>