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
import { useInstructorClassStore } from "@/stores/InstructorClassStore";
import { useUsersStore } from "@/stores/UserStore";
import LoggedInNavBar from "./LoggedInNavBar.vue";

export default {
    name: "LessonSelection",
    components: { LoggedInNavBar },
    data() {
        return {
            ready: false,
            videoClips: [],
            allClasses: [],
            currentStudentId: "",
            currentStudentsClasses: []
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
        },
        async retrieveStudentsClasses(){
          let instructorStore = useInstructorClassStore();
          let userStore = useUsersStore();
          this.allClasses = await instructorStore.fetchAllInstructorClasses()
          let currentUser = await userStore.getUserByName(this.$cookies.get("user_session").currentUserName)
          this.currentStudentId = currentUser[0]._id
          for (let i=0; i<this.allClasses.length; i++) {
            for(let j=0; j<this.allClasses[i].studentIds.length; j++){
              if (this.allClasses[i].studentIds[j] == this.currentStudentId) {
                this.currentStudentsClasses.push(this.allClasses[i])
              }
            }
          }
        }
    },
    async mounted() {
        let studentsVideoClipIds = []
        await this.retrieveStudentsClasses()
        for (let i=0; i<this.currentStudentsClasses.length; i++) {
          for(let j=0; j<this.currentStudentsClasses[i].videoclipIds.length; j++){
            if (!studentsVideoClipIds.includes(this.currentStudentsClasses[i].videoclipIds[j])) {
              studentsVideoClipIds.push(this.currentStudentsClasses[i].videoclipIds[j])
            }
          }
        }
        var videoClip = useVideoClipStore();
        for (let i=0; i<studentsVideoClipIds.length; i++) {
          let videoClipCurrent = await videoClip.fetchVideoClipById(studentsVideoClipIds[i])
          this.videoClips.push(videoClipCurrent)
        }
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