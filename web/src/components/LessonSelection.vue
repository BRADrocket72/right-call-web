<template>
<div>
  <LoggedInNavBar />
  <br/><br/>
  <div v-if="ready">
      <div class="div-header">
        <h1>Lesson Selection Page</h1>
      </div>
      <div class="lesson-div" v-if="this.lessons.length > 0">
        <div class="lesson" v-for="lesson in this.lessons" :key="lesson._id">
          <a class="nav-link" @click="openLesson(lesson._id)">
            <img class="lesson-img" :alt="lesson._id" src="../../images/richard-bagan-SmQ2Cku3alc-unsplash.jpg" />
            <p id="lessonName">{{ lesson.name }}</p>
            <p id="lessonContent">Instructor: {{ lesson.instructorName }} </p>
            <p id="lessonContent">Content: {{ lesson.videoClipsArray.length }} quizzes</p>
          </a>
        </div>
      </div>
      <div class="empty-lessons" v-else >
        <br/><br/><br/>
        <h4>You have no assigned lessons to take.</h4>
        <br/><br/><br/>
      </div>
  </div>
</div>
</template>

<script>
import { useInstructorClassStore } from "@/stores/InstructorClassStore";
import { useUsersStore } from "@/stores/UserStore";
import { useInstructorLessonStore } from "@/stores/InstructorLessonStore";
import LoggedInNavBar from "./LoggedInNavBar.vue";
import webgazer from 'webgazer';

export default {
    name: "LessonSelection",
    components: { LoggedInNavBar },
    data() {
        return {
            ready: false,
            lessons: [],
            allClasses: [],
            currentStudentId: "",
            currentStudentsClasses: []
        };
    },
    props:{},
    methods: {
        openLesson(lessonId) {
            this.$router.push({
                name: "VideoSelectionPage",
                params: {
                    lessonId: lessonId
                }
            });
        },
        async retrieveInstructorName(instructorId){
          let userStore = useUsersStore();
          let instructorName = userStore.getUserById(instructorId)
          return instructorName
        },
        async retrieveStudentsClasses(){
          let instructorStore = useInstructorClassStore();
          let userStore = useUsersStore();
          this.allClasses = await instructorStore.fetchAllInstructorClasses()
          let currentUser = await userStore.getUserByName(this.$cookies.get("user_session").currentUserName)
          this.currentStudentId = currentUser._id
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
        let cookiesCalibration = this.$cookies.get("user_session").currentEyeTrackingCalibration
        if (cookiesCalibration == "true") {
          webgazer.showPredictionPoints(false)
          webgazer.pause()
        }
        let studentsVideoClipIds = []
        await this.retrieveStudentsClasses()
        for (let i=0; i<this.currentStudentsClasses.length; i++) {
          for(let j=0; j<this.currentStudentsClasses[i].lessonIds.length; j++){
            if (!studentsVideoClipIds.includes(this.currentStudentsClasses[i].lessonIds[j])) {
              studentsVideoClipIds.push(this.currentStudentsClasses[i].lessonIds[j])
            }
          }
        }
        var instructorLessonStore = useInstructorLessonStore();
        for (let i=0; i<studentsVideoClipIds.length; i++) {
          let lessonCurrent = await instructorLessonStore.fetchLessonById(studentsVideoClipIds[i])
          lessonCurrent.instructorName = await this.retrieveInstructorName(lessonCurrent.instructorId)
          this.lessons.push(lessonCurrent)
        }
        this.ready = true;
    }
};
</script>

<style scoped>
.lesson-container {
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
  width: 100%;
  margin: 0 auto;
}

.nav-link {
    min-height: 350px;
}

.lesson {
  flex: 1 0 23%;
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

#lessonName {
  padding: 15px 0 0 20px;
  font-weight: bold;
  font-size: 20px;
}

#lessonContent {
  padding: 15px 0 0 20px;

}

.empty-lessons{
  border-radius: 15px;
  border: 1px solid #4AAE9B;
}
</style>