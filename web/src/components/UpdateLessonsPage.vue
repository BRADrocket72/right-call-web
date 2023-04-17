<template>
    <div>
      <LoggedInNavBar />
      <div class="admin-container">
        <br/>
        <h1>Select Lesson to Edit</h1>
        <div class="admin-buttons">
            <div v-for="lesson in allLessons" :key="lesson._id">
                <button type="button" class="button-selection buttonLink" @click="selectLesson(lesson)"><span>{{lesson.name}}</span></button>
                <p class="upload-description">{{lesson.description}}</p>
            </div>
        </div>
      </div>
    </div>
</template>
    
    <script>
    import LoggedInNavBar from './LoggedInNavBar.vue';
    import { useLessonStore } from '@/stores/LessonsStore';
    
        
    export default {
        name: "UpdateLessonsPage",
        components: { LoggedInNavBar },
        data() {
            return {
                allLessons: []
            }
        },
        async mounted() {
            let lessonStore = useLessonStore()
            this.allLessons = await lessonStore.getAllLessons()
        },
        methods: {
            selectLesson(lesson) {
              this.$router.push({
                  name: "AssignTimestamps",
                  params: {
                      selectedLesson: lesson._id
                  }
                })
            }
        }
    }
    </script>
    
    <style scoped>
    
    .button-selection {
      display: inline-flex;
      align-content: flex-start;
      flex: 1 0 0;
      height: 300px;
      width: 300px;
      margin: 10px 20px 10px auto;
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
      margin: -150px 0 0 30px;
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
    </style>