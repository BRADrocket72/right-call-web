<template>
    <div>
      <LoggedInNavBar />
      <div class="admin-container">
        <br/>
        <h1>Select Lesson to Update</h1>
        <br/>
        <h5>Your custom lessons:</h5>
        <div class="admin-buttons">
            <div v-for="lesson in instructorLessons" :key="lesson._id" @click="selectLessonToCustomize(lesson)">
                <button type="button" class="button-selection buttonLink"><span>{{lesson.name}}</span></button>
                <p class="upload-description">{{lesson.description}}<br/><br/>Content: {{ lesson.videoClipsArray.length }} videos</p>
            </div>
        </div>
        <div class="empty-lessons" v-if="isLessonsEmpty" >
          <br/><br/><br/>
          <h4>You have no custom lessons.</h4>
          <br/><br/>
          No Custom Lessons? <a class="to-class-creation-page" @click="redirectToLessonCustomizationPage" >Create a Custom Lesson Here</a>
          <br/>
      </div>
      </div>
    </div>
</template>
    
    <script>
    import LoggedInNavBar from './LoggedInNavBar.vue';
    import { useUsersStore } from "@/stores/UserStore";
    import { useInstructorLessonStore } from "@/stores/InstructorLessonStore";    
        
    export default {
        name: "UpdateInstructorLessonsPage",
        components: { 
          LoggedInNavBar
        },
        data() {
            return {
                instructorLessons: [],
                isLessonsEmpty: false
            }
        },
        async mounted() {
          var userStore = useUsersStore();
          let instructorUsername = this.$cookies.get("user_session").currentUserName
          let instructor =  await userStore.getUserByName(instructorUsername)
          this.instructorId = instructor._id
          let instructorLessonStore = useInstructorLessonStore();
          this.instructorLessons = await instructorLessonStore.getLessonsByInstructorId(this.instructorId)
          if (this.instructorLessons.length == 0) {
            this.isLessonsEmpty = true
          }
        },
        methods: {
            selectLessonToCustomize(lesson) {
              this.$router.push({
                  name: "AssignTimestamps",
                  params: {
                      selectedLesson: lesson._id
                  }
              })
            },
            redirectToLessonCustomizationPage() {
              this.$router.push({
                name: "CustomizeLessonMainPage"
              })
            }
        }
    }
    </script>
    
    <style scoped>
    
    .admin-container {
      margin: auto;
      display: flex;
      flex-direction: column;
    }

    .button-selection {
      display: inline-flex;
      align-content: flex-start;
      flex: 1 0 0;
      height: 300px;
      width: 300px;
      margin: auto 20px 30px auto;
      border: 4px solid #0e333c;
      color: #0e333c;
      background: #e9e9e9;
      border-radius: 10px;
      box-shadow: 5px 5px 10px #d3d3d3;
    }
    
    .button-selection span {
      margin: 20px auto;
      font-size: 25px;
      font-weight: bold;
    }
    
    .upload-description {
      position: absolute;
      max-width: 250px;
      min-width: 250px;
      margin: -200px 0 0 30px;
      font-size: 19px;
      font-weight: normal;
      color: #0e333c;
    }
    
    .delete-description {
      position: absolute;
      max-width: 250px;
      min-width: 250px;
      margin: -150px 0 0 42px;
      font-size: 19px;
      font-weight: normal;
      color: #0e333c;
    }
    
    .assign-description {
      position: absolute;
      max-width: 250px;
      min-width: 250px;
      margin: -150px 0 0 42px;
      font-size: 19px;
      font-weight: normal;
      color: #0e333c;
    }
    
    .admin-buttons {
      display: flex;
      flex: 22%;
      margin: 60px;
      flex-wrap: wrap;
    }
    
    .admin-buttons a {
      font-weight: bold;
      color: #4AAE9B;
      text-decoration: none;
    }
    
    @media only screen and (min-width: 1400px) {
      .admin-buttons {
        margin-left: 175px;
      }
    }
    
    @media only screen and (min-width: 1200px) and (max-width: 1399px){
      .admin-buttons {
        margin-left: 100px;
      }
    }
    
    @media only screen and (max-width: 1199px){
      .admin-buttons {
        margin-left: 0;
      }
    }

  .empty-lessons{
    border-radius: 15px;
    border: 1px solid #4AAE9B;
  }
    </style>