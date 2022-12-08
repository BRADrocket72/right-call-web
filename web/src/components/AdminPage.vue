<template>
  <LoggedInNavBar />
  <br/><br/>
  <div>
    <h1>Admin Page</h1>
    <br><br>
    <nav>
        <router-link to="/VideoUpload">Upload Lesson Video</router-link> |
        <router-link to="/LessonDeletion">Delete Lesson</router-link> |
        <router-link to="/AssignTimestamps">Assign Timestamps and Questions to a Video</router-link>
    </nav>
  </div>
</template>

<script>
import { useUsersStore } from '@/stores/UserStore';
import LoggedInNavBar from './LoggedInNavBar.vue';

    
export default {
    name: "AdminPage",
    components: { LoggedInNavBar },
    mounted() {
        var store = useUsersStore();
        if (store.currentUserToken.length < 1) {
            this.$router.push({
                name: "LoginPage"
            });
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

</style>