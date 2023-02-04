<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-content" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Add/Remove Students From this Class
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <h4>Click the student to either add or remove the student</h4>
            <br/><br/><br/>
            <div class="video-list-div" >
              <p>Remove Student From Class: </p>
              <div class="lesson" v-for="student in currentlyAddedStudents" :key="student._id">
                  <a class="nav-link" @click="deleteStudent(student)">
                      <h1><h5>Username: {{student.userName}}</h5><h5>Student id: {{student._id}}</h5></h1>
                  </a>   
              </div>
            </div>
            <div class="video-list-div" >
              <p>Add Student to Class: </p>
              <div class="lesson" v-for="student in studentsNotAdded" :key="student._id">
                  <a class="nav-link" @click="addStudent(student)">
                      <h1>{{student.userName}}</h1>
                  </a>   
              </div>
            </div>

            <button type="button" class="btn-green" @click="close()">Exit</button>
            <br/>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { useUsersStore } from '@/stores/UserStore'
import {useInstructorClassStore} from '@/stores/InstructorClassStore'
import {retrieveOnlyStudents} from '@/util/RetrieveOnlyStudents'
import InstructorClassDto from '@/models/InstructorClassDto'

export default {
  name: 'AddStudentsModal',
  data() {
    return {
      studentIds: [],
      allUsers: [],
      allStudents: [],
      currentlyAddedStudents: []
    }
  },
  props: {
      selectedClass: InstructorClassDto
  },
  async mounted() {
      var users = useUsersStore();
      this.allUsers = await users.getAllUsers();
      this.allStudents = retrieveOnlyStudents(this.allUsers);
      this.studentIds = this.selectedClass.studentIds
      for (let i=0; i<this.studentIds.length; i++) {
        for (let j=0; j<this.allStudents.length; j++) {
          if (this.allStudents[j]._id == this.studentIds[i]){
            this.currentlyAddedStudents.push(this.allStudents[j])
          }
        }
      }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async addStudent(student) {
      var classes = useInstructorClassStore();
      for (let i=0; i<this.studentIds.length; i++) {
        if (this.studentIds[i] == student._id){
          this.alreadyAdded = true
        }
      }
      if (!this.alreadyAdded) {
        this.studentIds.push(student._id)
      }
      await classes.updateStudentIdsList(this.selectedClass._id, this.studentIds)
      this.close()
    },
    async deleteStudent(student) {
      var classes = useInstructorClassStore();
      let updatedStudentIds = []
      for (let i=0; i<this.studentIds.length; i++) {
        if (this.studentIds[i] != student._id){
          updatedStudentIds.push(this.studentIds[i])
        }
      }
      await classes.updateStudentIdsList(this.selectedClass._id, updatedStudentIds)
      this.close()
    }
  },
  computed: {
    studentsNotAdded() {
      var currentlyAddedStudentIds = []
      for (let i=0; i<this.currentlyAddedStudents.length; i++) {
        currentlyAddedStudentIds.push(this.currentlyAddedStudents[i]._id)
      }
      return this.allStudents.filter(x => !currentlyAddedStudentIds.includes(x._id))
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  width: 900px;
  height: 300px;
  border-radius: 2px;
  position: fixed;
  left: auto;
  top: auto;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  background-color: #4AAE9B;
  justify-content: space-between;
  border-radius: 2px 2px 0px 0px;

}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  background: white;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #eeeeee;
  border-radius: 2px;
  padding: 15px;
  margin: 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
.video-list-div {
  display: flex;
  flex-direction: row;
  width: 100%;
   margin: 0 auto;
}
.lesson {
flex: 1 0 25%;
margin: 0 30px 30px 0;
text-align: left;
height: 100px;
max-height: 350px;
width: 200px;
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
height: 150px;
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
  height: 100px;
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
height: 150px;
}
</style>