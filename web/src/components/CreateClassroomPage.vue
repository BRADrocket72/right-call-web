<template>
    <div class="CreateClassroomPage">
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
</template>


<script>

import { useUsersStore } from '@/stores/UserStore'

export default {
    name: 'CreateClassroomPage',
    props: {
        msg: String
    },
    data(){
        return{students:[], 
        allUsers:[]
        }
    },
    async mounted(){
        var users = useUsersStore();
        this.allUsers = await users.getAllUsers();
        this.students = this.retrieveOnlyStudents(this.allUsers);
        console.log("students"+this.students);
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
            
            return type
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