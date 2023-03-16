<template>
    <LoggedInNavBar />
    <br/><br/>
    <div>
      <h1>View Student Results Page</h1>
      <br><br>
      <h5>Your Classes: <br/></h5>
      <div class="lesson-div">
        <div class="instructorClasses" v-for="instructorClass in this.instructorData" :key="instructorClass._id">
          <div class="title">
            <p>{{ instructorClass.className }} <br/></p>
          </div>
          <br/><br/>

        </div>
      </div>
      <div class="empty-classes" v-if="isLessonsEmpty" >
        <br/><br/><br/>
        <h4>You have not created any classes.</h4>
        <br/><br/>
        No Classes Created? <a class="to-class-creation-page" @click="redirectToClassCreationPage" >Create a Class Here</a>
        <br/>
      </div>
      <AddStudentsModal v-if="isReadyToAddStudents" :selectedClass="currentClass" @close="closeAddStudentsModal"></AddStudentsModal>
      <AddVideosToClassModal v-if="isReadyToAddVideos" :selectedClass="currentClass" @close="closeAddVideosModal"></AddVideosToClassModal>
    </div>
  </template>
  
  <script>
  import LoggedInNavBar from './LoggedInNavBar.vue';
  import AddStudentsModal from '@/components/modals/AddStudentsModal.vue'
  import AddVideosToClassModal from '@/components/modals/AddVideosToClassModal.vue'
  import InstructorClassDto from '@/models/InstructorClassDto'
  import { useInstructorClassStore } from '@/stores/InstructorClassStore'
  import { useLessonStore } from '@/stores/LessonsStore'
  import { useUsersStore } from '@/stores/UserStore'

      
  export default {
      name: "UpdateClassPage",
      components: { 
        LoggedInNavBar,
        AddStudentsModal,
        AddVideosToClassModal
      },
      data() {
        return {
          instructorId: "",
          instructorData: [],
          isReadyToAddStudents: false,
          isReadyToAddVideos: false,
          currentClass: InstructorClassDto,
          isLessonsEmpty: false,
          lessonDataList: []
        }
      },
      async mounted() {
        var userStore = useUsersStore();
        let instructorUsername = this.$cookies.get("user_session").currentUserName
        let instructor =  await userStore.getUserByName(instructorUsername)
        this.instructorId = instructor._id
        let instructorClassStore = useInstructorClassStore()
        this.instructorData = await instructorClassStore.getClassesByInstructorId(this.instructorId)
        if (this.instructorData.length == 0 ) {
          this.isLessonsEmpty = true
        }
        this.showClassroomData()
        this.showLessonData()

    },
      methods: {
        async showClassroomData() {
          let instructorClassStore = useInstructorClassStore()
          this.instructorData = await instructorClassStore.getClassesByInstructorId(this.instructorId)
          console.log(this.instructorData)
        },
        async showLessonData(){
            
          let lessonStore = useLessonStore()
          console.log(this.instructorData.lessonIds)
          const Ids = this.instructorData.lessonIds
          for (const id of Ids){
            this.lessonDataList.push( await lessonStore.getLessonById(id) )
          }
          console.log(this.lessonDataList)
        },
        async showStudentsInClassrooms() {
          let instructorClassStore = useInstructorClassStore()
          this.instructorData = await instructorClassStore.getClassesByInstructorId(this.instructorId)
        },
        redirectToClassCreationPage() {
          this.$router.push({
            name: "where should this redirect ?"
          })
        }
      }
  }
  </script>
  
  <style scoped>
  nav {
    padding: 30px;
  }
  
  nav a {
    font-weight: bold;
    color: #4AAE9B;
  }
  .instructorClasses {
  flex: 1 0 25%;
  margin: 0 30px 30px 0;
  text-align: left;
  height: 350px;
  max-height: 350px;
  width: 285px;
  max-width: 285px;
  border-radius: 6px;
  box-shadow: 0 10px 10px #d1d1d1;
  text-align: center;
}
.nav-link {
    min-height: 350px;
}
.lesson-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}
.button {
    width: 86px;
    height: 40px;
    border: 1px solid #0e333c;
    background: #FFFFFF;
    text-decoration: none;
    font-weight: normal;
}
.updateButton {
    margin: 10px;
    width: 105px;
    height: 55px;
    border: 1px solid #0e333c;
    background: #4AAE9B;
    text-decoration: none;
    font-weight: normal;
    color: #FFFFFF;
    /* font-weight: bold; */
}
.updateButton:hover {
    background: #0e333c;
    color: #FFFFFF;
    animation: fadeInFromNone 0.5s ease-out;
}
.title {
  /* border-radius: 6px; */
  text-align: center;
  box-shadow: 0 0px 5px #0e333c;
  background-color: #4AAE9B;
  color: #FFFFFF;
  font-weight: bold;
}
#studentCount {
  text-align: center;
}
  
.empty-classes{
  border-radius: 15px;
  border: 1px solid #4AAE9B;
}
  </style>