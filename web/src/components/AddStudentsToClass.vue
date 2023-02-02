<template>
    <LoggedInNavBar />
    <br/><br/>
    <div>
      <h1>Add Students To Class</h1>
      <br><br>
      <p>Your Classes: <br/></p>
      <div class="lesson-div">
        <div class="instructorClasses" v-for="instructorClass in this.instructorsClasses" :key="instructorClass._id">
          <div class="title">
            <p>Class <br/></p>
          </div>
          <p id="studentCount">{{ instructorClass.studentIds.length }} Students</p>
          <br/><br/>
          <button class="button" type="submit" @click="selectClass(instructorClass)">Select</button>
        </div>
      </div>
      <AddStudentsModal v-if="isReadyToAddStudents" :selectedClass="currentClass" @close="closeModal"></AddStudentsModal>

    </div>
  </template>
  
  <script>
  import LoggedInNavBar from './LoggedInNavBar.vue';
  import AddStudentsModal from '@/components/modals/AddStudentsModal.vue'
  import InstructorClass from '@/models/InstructorClassDto'
  import { useInstructorClassStore } from '@/stores/InstructorClassStore'
  import { useUsersStore } from '@/stores/UserStore'

      
  export default {
      name: "AddStudentsToClass",
      components: { 
        LoggedInNavBar,
        AddStudentsModal
      },
      data() {
        return {
          instructorId: "",
          instructorsClasses: [],
          isReadyToAddStudents: false,
          currentClass: InstructorClass
        }
      },
      async mounted() {
        var userStore = useUsersStore();
        let instructorUsername = this.$cookies.get("user_session").currentUserName
        let instructor =  await userStore.getUserByName(instructorUsername)
        this.instructorId = instructor[0]._id
        let instructorClassStore = useInstructorClassStore()
        this.instructorsClasses = await instructorClassStore.getClassesByInstructorId(this.instructorId)
      },
      methods: {
        selectClass(selectedInstructorClass) {
          this.currentClass = selectedInstructorClass
          this.isReadyToAddStudents = true
        },
        closeModal() {
          this.isReadyToAddStudents = false
        }
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
.title {
  /* border-radius: 6px; */
  text-align: center;
  box-shadow: 0 0px 5px #0e333c;
}
#studentCount {
  text-align: center;
}
  
  </style>