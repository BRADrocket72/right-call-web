<template>
    <LoggedInNavBar />
    <br/><br/>
    <div>
      <h1>Add Students To Class</h1>
      <br><br>
      <p>Your Classes: <br/></p>
      <div class="lesson-div">
        <div class="instructorClasses" v-for="instructorClass in this.instructorsClasses" :key="instructorClass._id">
          <p>Class </p>
          <p>{{ instructorClass.studentIds.length }} Students</p>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import LoggedInNavBar from './LoggedInNavBar.vue';
  import { useInstructorClassStore } from '@/stores/InstructorClassStore'
  import { useUsersStore } from '@/stores/UserStore'

      
  export default {
      name: "AddStudentsToClass",
      components: { LoggedInNavBar },
      data() {
        return {
          instructorId: "",
          instructorsClasses: []
        }
      },
      async mounted() {
        var userStore = useUsersStore();
        let instructorUsername = this.$cookies.get("user_session").currentUserName
        let instructor =  await userStore.getUserByName(instructorUsername)
        this.instructorId = instructor[0]._id
        let instructorClassStore = useInstructorClassStore()
        this.instructorsClasses = await instructorClassStore.getClassesByInstructorId(this.instructorId)
      }
  }
  </script>
  
  <style>
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
  
  </style>