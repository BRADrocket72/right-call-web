<template>
  <LoggedInNavBar />
  <br/><br/>
  <div>
    <h1>Instructor Page</h1>
    <br><br>
    <nav>
        <router-link to="/CreateClassroomPage">Create Classroom Page</router-link> |
        <router-link to="/AssignTimestamps">Assign Timestamps and Questions to a Video</router-link> |
        <router-link to="/AddStudentsToClass">Add Students to Class</router-link>
    </nav>
  </div>
</template>

<script>
import LoggedInNavBar from './LoggedInNavBar.vue';

    
export default {
    name: "InstructorPage",
    components: { LoggedInNavBar },
    mounted() {
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

</style>