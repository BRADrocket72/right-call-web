<template>
    <div class="CreateClassroomPage">
        <LoggedInNavBarVue />
        This is the classroom creation page 
        <table>
            All Students
            <tr v-for="student in students" :key="student">
                <a class="nav-link" @click="addStudentToClass(student._id)">
                    {{student.userName}}
                </a>
            </tr>
        </table>
    </div>
    <div id="addedStudents">

    </div>
    <button @click="createClass" >Create Class</button>
</template>


<script>
import LoggedInNavBarVue from './LoggedInNavBar.vue'
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
        this.students = this.retrieveOnlyStudents(this.allUsers);
    },
    methods:{
        retrieveOnlyStudents(users){
            var studentArray = [];
            for (var user of users){
                if (user.userType == "Student"){
                    studentArray.push(user);
                }
            }
            return studentArray;
        },
        addStudentToClass(type){
            let table = document.getElementById("addedStudents")
            table.innerHTML += "student:" + type + "<br/>"
            this.classroom.push(type)
        },
        async createClass() {
            var userStore = useUsersStore();
            let instructorUsername = this.$cookies.get("user_session").currentUserName
            let instructor =  await userStore.getUserByName(instructorUsername)
            this.instructorId = instructor[0]._id
            var instructorClassStore = useInstructorClassStore()
            await instructorClassStore.postInstructorClass(this.instructorId, [1], this.classroom)
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

</style>