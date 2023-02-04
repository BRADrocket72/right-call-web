<template>
    <div class="CreateClassroomPage">
        <LoggedInNavBarVue />
        Classroom Creation 
        <table>
            All Students
            <tr v-for="student in students" :key="student">
                <a class="nav-link" id="studentLink" @click="addStudentToClass(student._id)">
                    {{student.userName}}
                </a>
            </tr>
        </table>
    </div>
    <div id="addedStudents">

    </div>
    <button class="createClass" @click="createClass" >Create Class</button>
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
        classroom:[]
        }
    },
    async mounted(){
        var users = useUsersStore();
        this.allUsers = await users.getAllUsers();
        this.students = retrieveOnlyStudents(this.allUsers);
    },
    methods:{
        addStudentToClass(student){
            let table = document.getElementById("addedStudents")
            table.innerHTML += "student:" + student + "<br/>"
            this.classroom.push(student)
        },
        async createClass() {
            var userStore = useUsersStore();
            let instructorUsername = this.$cookies.get("user_session").currentUserName
            let instructor =  await userStore.getUserByName(instructorUsername)
            this.instructorId = instructor[0]._id
            var instructorClassStore = useInstructorClassStore()
            await instructorClassStore.postInstructorClass(this.instructorId, [], this.classroom)
            this.$router.push({
                name: "InstructorPage"
            })
        }
    }
}
</script>

<style>

.CreateClassroomPage {
  font-weight: bold;
  color: #4AAE9B;
}
table {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 300px;
  height: 350px;
}
tr {
  height: 5%;
}

</style>