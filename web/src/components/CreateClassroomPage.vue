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
                <table class="studentsTable">
                    <br/>
                    Select Student to Add to Class
                    <br/>
                    <tr v-for="student in students" :key="student">
                        <a class="nav-link" id="studentLink" @click="addStudentToClass(student.userName, student._id)">
                            {{student.userName}}
                        </a>
                    </tr>
                </table>
            </div>
            <div id="addedStudents">
                <table class="studentsTable">
                    <br/>
                    Selected Students
                    <br/>
                    <tr v-for="studentName in addedStudents" :key="studentName">
                        <p class="studentName">{{studentName}}</p>
                    </tr>
                </table>
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
                this.instructorId = instructor[0]._id
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
.studentsTable {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 300px;
  height: 400px;
  border: 3px solid #4AAE9B;
  background-color: white;
}
tr {
  height: 5%;
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


</style>