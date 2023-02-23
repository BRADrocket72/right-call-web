<template>
    <LoggedInNavBarVue />
    <div class="CreateClassroomPage">
        <br/>
        <h3>Classroom Creation </h3>
        <br/>
        <label>
            Class Name: 
            <input type="text" id="className" v-model="className"/>
        </label>
        <br/><br/><br/>
        <div class="grid-container">
            <div id="notAddedStudents">
                <div class="studentsTable">
                    <br/>
                    <p>Select Student to Add to Class</p>
                    <br/>
                    <div v-for="student in students" :key="student">
                        <a class="nav-link" id="studentLink" @click="addStudentToClass(student.userName, student._id)">
                            {{student.userName}}
                        </a>
                    </div>
                </div>
            </div>
            <div id="addedStudents">
                <div class="studentsTable">
                    <br/>
                    <p>Students Selected for this Class</p>
                    <br/>
                    <div v-for="studentName in addedStudents" :key="studentName">
                        <p class="studentName">{{studentName}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br/>
    <button class="createClass" @click="createClass" >Create Class</button>
    <div class="error" v-if = "error">
      Class Name field is required
    </div>
</template>

<script>
import LoggedInNavBarVue from './LoggedInNavBar.vue'
import {retrieveOnlyStudents} from '@/util/RetrieveOnlyStudents'
import { useUsersStore } from '@/stores/UserStore'
import { useInstructorClassStore } from '@/stores/InstructorClassStore'

export default {
    name: 'CreateClassroomPage',
    props: {
        msg: String
    },
    components: {
        LoggedInNavBarVue
    },
    data(){
        return{students:[],
        allUsers:[],
        classroom:[],
        error: false,
        className: "",
        addedStudents: []
    }
    },
    async mounted(){
        var users = useUsersStore();
        this.allUsers = await users.getAllUsers();
        this.students = retrieveOnlyStudents(this.allUsers);
    },
    methods:{
        addStudentToClass(userName, id){
            this.addedStudents.push(userName)

            this.classroom.push(id)
        },
        async createClass() {
            if (this.className.length == 0) {
                this.error = true
            }
            else {
                var userStore = useUsersStore();
                let instructorUsername = this.$cookies.get("user_session").currentUserName
                let instructor =  await userStore.getUserByName(instructorUsername)
                this.instructorId = instructor._id
                var instructorClassStore = useInstructorClassStore()
                await instructorClassStore.postInstructorClass(this.instructorId, this.className, [], this.classroom)
                this.$router.push({
                    name: "InstructorPage"
                })
            }
        }
    }
}
</script>

<style>

.CreateClassroomPage {
  font-weight: bold;
  color: #4AAE9B;
}
#notAddedStudents {
  grid-row-start: 1;
  grid-column-start: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 3px solid #4AAE9B;
  height: 450px;
  width: 440px;
  overflow: auto;
  margin-right:  50px;
  border-radius: 6px;
}

#addedStudents {
  grid-row-start: 1;
  grid-column-start: 2;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 3px solid #4AAE9B;
  height: 450px;
  width: 440px;
  overflow: auto;
  margin-right:  50px;
  border-radius: 6px;
}
a{
    cursor: pointer;
}

.studentName {
    color: black;
}
#addedStudents {
    grid-column-start: 2;
}
#notAddedStudents {
    grid-column-start: 1;
}
.grid-container {
  display:inline-grid;
  gap: 75px;
}
.error {
    color: red;
}
#notAddedStudents a {
    width: 205px;
    height: 10px;
}

#addedStudents a {
    width: 205px;
    height: 5px;
}

.studentsTable {
    width: 440px;
}
.studentsTable div {
    display: flex;
    justify-content: center;
    max-height: 200px;
}
.studentsTable p {
    margin: 2px auto 2px auto;
}


</style>