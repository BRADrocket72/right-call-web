<template>
    <div>
      <h1>Home Page</h1>
      <br><br>
      <nav>
          <router-link to="/VideoUpload">Upload Lesson Video</router-link> |
          <router-link to="/AddQuestions">Add Question/s to Video</router-link> |
          <router-link to="/AssignTimestamps">Assign Timestamps to a Video</router-link>
          <h1>this page will check if user is admin, instructor, or teacher and provide their available actions</h1>
      </nav>
    </div>
  </template>
  
  <script>
  import { useUsersStore } from '@/stores/UserStore';

      
  export default {
    name: 'AdminPage',
    mounted() {
        var store = useUsersStore();
        if (store.currentUserToken.length < 1) {
            this.$router.push({
                name: "LoginPage"
            })
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